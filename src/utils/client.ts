import { createHmac } from "crypto";

import {
  AE_API_NAMES,
  AE_Base_Client,
  AE_EXECUTE_FN_PARAMS,
  AE_EXECUTE_FN_RESULT,
  AE_Response_Format,
  PublicParams,
} from "../types";

export class AEBaseClient implements AE_Base_Client {
  readonly app_key: string;
  readonly app_secret: string;
  readonly session: string;
  readonly url: string;
  readonly format: AE_Response_Format;

  protected readonly sign_method = "sha256";

  constructor(init: AE_Base_Client) {
    this.app_key = init.app_key;
    this.app_secret = init.app_secret;
    this.session = init.session;
    this.url = init.url ?? "https://api-sg.aliexpress.com/sync";
    this.format = init.format ?? "json";
  }

  protected sign(params: any): string {
    let basestring = "";
    let sorted = Object.keys(params).sort();

    for (let i = 0; i < sorted.length; i++) {
      basestring += sorted[i] + params[sorted[i] as keyof typeof params];
    }
    return createHmac("sha256", this.app_secret, { encoding: "utf-8" })
      .update(basestring)
      .digest("hex")
      .toUpperCase();
  }

  protected async call<T extends PublicParams, K>(params: T) {
    try {
      let basestring = this.url;
      let sorted = Object.keys(params).sort();

      for (let i = 0; i < sorted.length; i++) {
        let symbol = i === 0 ? "?" : "&";
        if (params[sorted[i] as keyof typeof params])
          basestring +=
            symbol +
            sorted[i] +
            "=" +
            encodeURIComponent(
              params[sorted[i] as keyof typeof params] as
                | number
                | string
                | boolean,
            );
      }
      const res = await fetch(basestring, { method: "POST" });
      return (await res.json()) as K;
    } catch (error) {
      console.error(error);
      return;
    }
  }

  protected async execute<K extends AE_API_NAMES>(
    method: K,
    params: AE_EXECUTE_FN_PARAMS<K>,
  ) {
    const parameters: AE_EXECUTE_FN_PARAMS<K> & PublicParams = {
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
      AE_EXECUTE_FN_PARAMS<K> & PublicParams,
      AE_EXECUTE_FN_RESULT<K>
    >(parameters);
  }
}
