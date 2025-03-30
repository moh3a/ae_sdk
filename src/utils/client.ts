/**
 * @fileoverview
 * AliExpress Base API Client implementation.
 * This file contains the base client for interacting with AliExpress API endpoints,
 * handling authentication, request signing, URL assembly, and response handling.
 *
 * The AEBaseClient provides core functionality that is extended by specific client
 * implementations like DropshipperClient and AffiliateClient. It manages the
 * authentication flow, signing of requests according to AliExpress API requirements,
 * and standardized error handling.
 *
 * This base implementation supports both legacy TOP API routes and newer OP API routes,
 * handling the differences in URL structure and request formatting automatically.
 */
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

/**
 * Base client for AliExpress API interactions.
 *
 * This class provides the core functionality for authenticating, signing, and sending
 * requests to AliExpress API endpoints. It handles the complexities of the AliExpress
 * authentication protocol, including request signing, parameter formatting, and
 * response parsing.
 *
 * The class supports both older "TOP" API endpoints and newer "OP" API routes,
 * automatically determining the correct URL format and parameter handling based on
 * the method name.
 */
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

  /**
   * Generates a signature for the API request based on AliExpress API requirements.
   *
   * Creates an HMAC signature using the app secret and a sorted concatenation of
   * all request parameters. The signature is used to authenticate the request
   * and verify the integrity of the parameters.
   *
   * Handles both TOP API and OP API signature formats, which differ slightly
   * in how the method parameter is handled.
   *
   * @param params - Request parameters to be signed
   * @returns The generated HMAC signature as an uppercase hexadecimal string
   */
  protected sign(params: any): string {
    const p = { ...params };
    let basestring = "";
    if (typeof p.method === "string" && p.method.includes("/")) {
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

  /**
   * Constructs the complete URL for an API request with all parameters.
   *
   * Builds a properly formatted URL with query parameters for an AliExpress API request.
   * Handles the differences between TOP API and OP API URL formats automatically
   * based on the method name format.
   *
   * Parameters are sorted alphabetically and encoded properly for URL inclusion.
   *
   * @param params - Request parameters including the API method name
   * @returns A complete URL string ready for the API request
   */
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

  /**
   * Sends a request to the AliExpress API and processes the response.
   *
   * Makes an HTTP POST request to the AliExpress API using the assembled URL
   * and handles various error conditions including network errors, HTTP errors,
   * and JSON parsing errors. Provides a standardized response format for both
   * successful and failed requests.
   *
   * @param params - Complete set of parameters for the API request
   * @returns A Result object containing either the parsed response data or error information
   */
  protected async call<T extends PublicParams, K>(params: T): Result<K> {
    const [fetchError, response] = await tryFn(
      fetch(this.assemble(params), { method: "POST" }),
    );
    if (fetchError) {
      if (fetchError instanceof TypeError) {
        return {
          ok: false,
          message: `Network Error: ${fetchError.message}`,
          error: fetchError,
        };
      }
      return {
        ok: false,
        message: `Fetch Error: ${fetchError.message}`,
        error: fetchError,
      };
    }

    if (!response?.ok)
      return {
        ok: false,
        message: `HTTP Error: ${response?.status} ${response?.statusText}`,
      };

    const [jsonError, data] = await tryFn(response?.json());
    if (jsonError) {
      if (jsonError instanceof SyntaxError) {
        return {
          ok: false,
          message: `Invalid JSON Response: ${jsonError.message}`,
          error: jsonError,
        };
      }
      return {
        ok: false,
        message: `JSON Parsing Error: ${jsonError.message}`,
        error: jsonError,
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

  /**
   * Executes a typed API method with the appropriate parameters.
   *
   * This method prepares and sends a strongly-typed request to the AliExpress API.
   * It automatically adds required authentication parameters, generates the signature,
   * and formats the request properly for the specified API method.
   *
   * The strong typing ensures that the correct parameter types are used for each API method
   * and that the response is correctly typed according to the expected result.
   *
   * @param method - The AliExpress API method name to execute
   * @param params - Method-specific parameters for the API call
   * @returns A Result object with the strongly-typed response data or error information
   */
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

  /**
   * Executes an API call directly with a custom method name and parameters.
   *
   * This method allows for calling API endpoints that may not be covered by the
   * strongly-typed methods, or for experimental or newly released API methods.
   * It provides the same authentication, signing, and error handling but with
   * less type safety.
   *
   * This is useful for testing new APIs or handling edge cases without needing to
   * update the type definitions.
   *
   * @param method - The AliExpress API method name as a string
   * @param params - Custom parameters for the API call
   * @returns A Result object with the response data or error information
   */
  async callAPIDirectly<
    TData extends Record<string, string | number | boolean>,
    TResponse,
  >(method: string, params: TData): Result<TResponse> {
    if (!method?.trim())
      return {
        ok: false,
        message: "Method parameter is required",
      };

    if (!params || typeof params !== "object") {
      return {
        ok: false,
        message: "Params must be a valid object",
      };
    }

    const parameters = {
      ...params,
      method,
      session: this.session,
      app_key: this.app_key,
      simplify: true,
      sign_method: this.sign_method,
      timestamp: Date.now(),
    } as TData & PublicParams;
    parameters.sign = this.sign(parameters);

    return await this.call<TData & PublicParams, TResponse>(parameters);
  }
}
