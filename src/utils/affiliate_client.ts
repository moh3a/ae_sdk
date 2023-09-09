import {
  AE_AFFILIATE_EXECUTE_FN_PARAMS,
  AE_AFFILIATE_EXECUTE_FN_RESULT,
  AFFILIATE_API_NAMES,
  AE_Base_Client,
  PublicParams,
} from "../types/ae";
import { AEBaseClient } from "./client";

export class AEAffiliateClient extends AEBaseClient {
  constructor(init: AE_Base_Client) {
    super(init);
  }

  protected async execute<K extends AFFILIATE_API_NAMES>(
    method: K,
    params: AE_AFFILIATE_EXECUTE_FN_PARAMS<K>,
  ) {
    const parameters: AE_AFFILIATE_EXECUTE_FN_PARAMS<K> & PublicParams = {
      ...params,
      app_key: this.app_key,
      method,
      simplify: true,
      v: this.v,
      format: this.format,
      sign_method: this.sign_method,
      timestamp: this.get_timestamp(),
    };
    parameters.sign = this.sign(parameters);

    return await this.call<
      AE_AFFILIATE_EXECUTE_FN_PARAMS<K> & PublicParams,
      AE_AFFILIATE_EXECUTE_FN_RESULT<K>
    >(parameters);
  }
}
