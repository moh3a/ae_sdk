import {
  AE_AFFILIATE_EXECUTE_FN_PARAMS,
  AE_AFFILIATE_EXECUTE_FN_RESULT,
  AFFILIATE_API_NAMES,
  AE_Base_Client,
  PublicParams,
  Affiliate_Products_Result,
  Affiliate_Products_Params,
  Affiliate_Categories_Result,
  Affiliate_Featured_Promo_Products_Params,
  Affiliate_Featured_Promo_Products_Result,
  Affiliate_Product_Details_Params,
  Affiliate_Product_Details_Result,
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
      simplify: true,
      sign_method: this.sign_method,
      timestamp: this.get_timestamp(),
    };
    parameters.sign = this.sign(method, parameters);

    return await this.call<
      AE_AFFILIATE_EXECUTE_FN_PARAMS<K> & PublicParams,
      AE_AFFILIATE_EXECUTE_FN_RESULT<K>
    >(method, parameters);
  }

  async queryProducts(
    args: Affiliate_Products_Params,
  ): Promise<Affiliate_Products_Result | undefined> {
    return await this.execute("aliexpress.affiliate.product.query", args);
  }

  async queryHotProducts(
    args: Affiliate_Products_Params,
  ): Promise<Affiliate_Products_Result | undefined> {
    return await this.execute("aliexpress.affiliate.hotproduct.query", args);
  }

  async categories(): Promise<Affiliate_Categories_Result | undefined> {
    return await this.execute("aliexpress.affiliate.category.get", null);
  }

  async featuredPromo(
    args: Affiliate_Featured_Promo_Products_Params,
  ): Promise<Affiliate_Featured_Promo_Products_Result | undefined> {
    return await this.execute(
      "aliexpress.affiliate.featuredpromo.products.get",
      args,
    );
  }

  async productDetails(
    args: Affiliate_Product_Details_Params,
  ): Promise<Affiliate_Product_Details_Result | undefined> {
    return await this.execute("aliexpress.affiliate.productdetail.get", args);
  }
}
