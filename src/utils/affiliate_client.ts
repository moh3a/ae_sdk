import {
  AE_Base_Client,
  Affiliate_Products_Result,
  Affiliate_Products_Params,
  Affiliate_Categories_Result,
  Affiliate_Featured_Promo_Products_Params,
  Affiliate_Featured_Promo_Products_Result,
  Affiliate_Product_Details_Params,
  Affiliate_Product_Details_Result,
  Affiliate_Generate_Affiliate_Links_Params,
  Affiliate_Generate_Affiliate_Links_Result,
  Affiliate_Categories_Params,
  Affiliate_Featuredpromo_Info_Params,
  Affiliate_Featuredpromo_Info_Result,
  Affiliate_Order_Info_Params,
  Affiliate_Order_Info_Result,
  Affiliate_Hotproducts_Download_Result,
  Affiliate_Hotproducts_Download_Params,
  Affiliate_Smart_Match_Products_Params,
  Affiliate_Smart_Match_Products_Result,
  Affiliate_Order_List_Params,
  Affiliate_Order_List_Result,
  Affiliate_Order_List_ByIdx_Params,
  Affiliate_Order_List_ByIdx_Result,
  ResultType,
} from "../types";
import { AESystemClient } from "./system_client";

export class AffiliateClient extends AESystemClient {
  constructor(init: AE_Base_Client) {
    super(init);
  }

  /**
   *
   * @link https://open.aliexpress.com/doc/api.htm#/api?cid=21407&path=aliexpress.affiliate.link.generate&methodType=GET/POST
   *
   */
  async generateAffiliateLinks(
    args: Affiliate_Generate_Affiliate_Links_Params,
  ): ResultType<Affiliate_Generate_Affiliate_Links_Result> {
    return await this.execute("aliexpress.affiliate.link.generate", args);
  }

  /**
   *
   * @link https://open.aliexpress.com/doc/api.htm#/api?cid=21407&path=aliexpress.affiliate.category.get&methodType=GET/POST
   *
   */
  async getCategories(
    args: Affiliate_Categories_Params,
  ): ResultType<Affiliate_Categories_Result> {
    return await this.execute("aliexpress.affiliate.category.get", args);
  }

  /**
   *
   * @link https://open.aliexpress.com/doc/api.htm#/api?cid=21407&path=aliexpress.affiliate.featuredpromo.get&methodType=GET/POST
   *
   */
  async featuredPromoInfo(
    args: Affiliate_Featuredpromo_Info_Params,
  ): ResultType<Affiliate_Featuredpromo_Info_Result> {
    return await this.execute("aliexpress.affiliate.featuredpromo.get", args);
  }

  /**
   *
   * @link https://open.aliexpress.com/doc/api.htm#/api?cid=21407&path=aliexpress.affiliate.featuredpromo.products.get&methodType=GET/POST
   *
   */
  async featuredPromoProducts(
    args: Affiliate_Featured_Promo_Products_Params,
  ): ResultType<Affiliate_Featured_Promo_Products_Result> {
    return await this.execute(
      "aliexpress.affiliate.featuredpromo.products.get",
      args,
    );
  }

  /**
   *
   * @link https://open.aliexpress.com/doc/api.htm#/api?cid=21407&path=aliexpress.affiliate.hotproduct.download&methodType=GET/POST
   *
   */
  async getHotProductsDownload(
    args: Affiliate_Hotproducts_Download_Params,
  ): ResultType<Affiliate_Hotproducts_Download_Result> {
    return await this.execute("aliexpress.affiliate.hotproduct.download", args);
  }

  /**
   *
   * @link https://open.aliexpress.com/doc/api.htm#/api?cid=21407&path=aliexpress.affiliate.hotproduct.query&methodType=GET/POST
   *
   */
  async getHotProducts(
    args: Affiliate_Products_Params,
  ): ResultType<Affiliate_Products_Result> {
    return await this.execute("aliexpress.affiliate.hotproduct.query", args);
  }

  /**
   *
   * @link https://open.aliexpress.com/doc/api.htm#/api?cid=21407&path=aliexpress.affiliate.order.get&methodType=GET/POST
   *
   */
  async orderInfo(
    args: Affiliate_Order_Info_Params,
  ): ResultType<Affiliate_Order_Info_Result> {
    return await this.execute("aliexpress.affiliate.order.get", args);
  }

  /**
   * @link https://open.aliexpress.com/doc/api.htm#/api?cid=21407&path=aliexpress.affiliate.order.list&methodType=GET/POST
   */
  async ordersList(
    args: Affiliate_Order_List_Params,
  ): ResultType<Affiliate_Order_List_Result> {
    return await this.execute("aliexpress.affiliate.order.list", args);
  }

  /**
   * @link https://open.aliexpress.com/doc/api.htm#/api?cid=21407&path=aliexpress.affiliate.order.listbyindex&methodType=GET/POST
   */
  async ordersListByIndex(
    args: Affiliate_Order_List_ByIdx_Params,
  ): ResultType<Affiliate_Order_List_ByIdx_Result> {
    return await this.execute("aliexpress.affiliate.order.listbyindex", args);
  }

  /**
   * @link https://open.aliexpress.com/doc/api.htm#/api?cid=21407&path=aliexpress.affiliate.productdetail.get&methodType=GET/POST
   */
  async productDetails(
    args: Affiliate_Product_Details_Params,
  ): ResultType<Affiliate_Product_Details_Result> {
    return await this.execute("aliexpress.affiliate.productdetail.get", args);
  }

  /**
   * @link https://open.aliexpress.com/doc/api.htm#/api?cid=21407&path=aliexpress.affiliate.product.query&methodType=GET/POST
   */
  async queryProducts(
    args: Affiliate_Products_Params,
  ): ResultType<Affiliate_Products_Result> {
    return await this.execute("aliexpress.affiliate.product.query", args);
  }

  /**
   * @link https://open.aliexpress.com/doc/api.htm#/api?cid=21407&path=aliexpress.affiliate.product.smartmatch&methodType=GET/POST
   */
  async smartMatchProducts(
    args: Affiliate_Smart_Match_Products_Params,
  ): ResultType<Affiliate_Smart_Match_Products_Result> {
    return await this.execute("aliexpress.affiliate.product.smartmatch", args);
  }
}
