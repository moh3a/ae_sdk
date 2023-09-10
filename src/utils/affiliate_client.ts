import {
  AE_Base_Client,
  Affiliate_Products_Result,
  Affiliate_Products_Params,
  Affiliate_Categories_Result,
  Affiliate_Featured_Promo_Products_Params,
  Affiliate_Featured_Promo_Products_Result,
  Affiliate_Product_Details_Params,
  Affiliate_Product_Details_Result,
} from "../types";
import { AEBaseClient } from "./client";

export class AEAffiliateClient extends AEBaseClient {
  constructor(init: AE_Base_Client) {
    super(init);
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
