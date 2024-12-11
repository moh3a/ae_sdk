import { createHmac } from "crypto";

import type {
  AE_API_NAMES,
  AE_Base_Client,
  PublicParams,
  AliexpressMethod,
  Result,
} from "../types";
import {
  AE_OP_API_URL,
  AE_TOP_API_URL,
  RESPONSE_FORMAT,
  SIGN_METHOD,
  SIGN_METHOD_ENCODING,
} from "../constants";
import { tryFn } from ".";

export class AEBaseClient implements AE_Base_Client {
  readonly app_key: string;
  readonly app_secret: string;
  readonly session: string;

  protected readonly format = RESPONSE_FORMAT;
  protected readonly migrated_apis_url = AE_TOP_API_URL;
  protected readonly new_apis_url = AE_OP_API_URL;
  protected readonly sign_method = SIGN_METHOD;

  constructor(init: AE_Base_Client) {
    this.app_key = init.app_key;
    this.app_secret = init.app_secret;
    this.session = init.session;
  }

  protected sign(params: any): string {
    const p = { ...params };
    let basestring = "";
    if (typeof p.method === 'string' && p.method.includes("/")) {
      basestring = p.method;
      delete p.method;
    }

    basestring += Object.entries(p)
      .filter(([_, value]) => value != null)
      .sort(([a], [b]) => a.localeCompare(b))
      .reduce((acc, [key, value]) => acc + key + String(value), "");

    return createHmac(SIGN_METHOD, this.app_secret, {
      encoding: SIGN_METHOD_ENCODING,
    })
      .update(basestring)
      .digest("hex")
      .toUpperCase();
  }

  protected assemble<T extends PublicParams>(params: T): string {
    const p = { ...params };

    const baseUrl = p.method.includes("/")
      ? `${this.new_apis_url}${p.method}`
      : this.migrated_apis_url;

    if (p.method.includes("/")) {
      // @ts-ignore
      delete p.method;
    }

    const queryParams = Object.entries(p)
      .filter(([_, value]) => value != null)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([key, value], index) => {
        const prefix = index === 0 ? "?" : "&";
        return `${prefix}${key}=${encodeURIComponent(String(value))}`;
      })
      .join("");

    return baseUrl + queryParams;
  }

  protected async call<T extends PublicParams, K>(params: T): Result<K> {
    const [fetchError, response] = await tryFn(fetch(this.assemble(params), { method: "POST" }));
    if (fetchError) {
      if (fetchError instanceof TypeError) {
        return {
          ok: false,
          message: `Network Error: ${fetchError.message}`,
          error: fetchError
        };
      }
      return {
        ok: false,
        message: `Fetch Error: ${fetchError.message}`,
        error: fetchError
      };
    }

    if (!response?.ok) return {
      ok: false,
      message: `HTTP Error: ${response?.status} ${response?.statusText}`,
    };

    const [jsonError, data] = await tryFn(response?.json());
    if (jsonError) {
      if (jsonError instanceof SyntaxError) {
        return {
          ok: false,
          message: `Invalid JSON Response: ${jsonError.message}`,
          error: jsonError
        };
      }
      return {
        ok: false,
        message: `JSON Parsing Error: ${jsonError.message}`,
        error: jsonError
      };
    }

    if (data?.error_response)
      return {
        ok: false,
        message: "Bad request",
        error_response: data.error_response,
        request_id: data.error_response.request_id,
      };

    return { ok: true, data };
  }

  protected async execute<K extends AE_API_NAMES>(
    method: K,
    params: AliexpressMethod<K>["params"],
  ): Result<AliexpressMethod<K>["result"]> {
    const parameters: AliexpressMethod<K>["params"] & PublicParams = {
      ...params,
      method,
      session: this.session,
      app_key: this.app_key,
      simplify: true,
      sign_method: this.sign_method,
      timestamp: Date.now(),
    };
    parameters.sign = this.sign(parameters);

    return await this.call<
      AliexpressMethod<K>["params"] & PublicParams,
      AliexpressMethod<K>["result"]
    >(parameters);
  }

  async callAPIDirectly(
    method: string,
    params: Record<string, string | number | boolean>,
  ): Result<any> {
    if (!method) return {
      ok: false,
      message: 'Method parameter is required'
    };

    const parameters: any = {
      ...params,
      method,
      session: this.session,
      app_key: this.app_key,
      simplify: true,
      sign_method: this.sign_method,
      timestamp: Date.now(),
    };
    parameters.sign = this.sign(parameters);

    return await this.call<any, unknown>(parameters);
  }
}
