import { parse_affiliate_products } from ".";
import type {
  AE_Base_Client,
  Affiliate_Products_Params,
  Affiliate_Featured_Promo_Products_Params,
  Affiliate_Product_Details_Params,
  Affiliate_Generate_Affiliate_Links_Params,
  Affiliate_Categories_Params,
  Affiliate_Featuredpromo_Info_Params,
  Affiliate_Order_Info_Params,
  Affiliate_Hotproducts_Download_Params,
  Affiliate_Smart_Match_Products_Params,
  Affiliate_Order_List_Params,
  Affiliate_Order_List_ByIdx_Params,
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
  ) {
    let response = await this.execute(
      "aliexpress.affiliate.link.generate",
      args,
    );
    if (response.ok) {
      let data =
        response.data.aliexpress_affiliate_link_generate_response.resp_result
          .result.promotion_links;
      if ((data as any).promotion_link) {
        data = (data as any).promotion_link;
      }
    }
    return response;
  }

  /**
   *
   * @link https://open.aliexpress.com/doc/api.htm#/api?cid=21407&path=aliexpress.affiliate.category.get&methodType=GET/POST
   *
   */
  async getCategories(args: Affiliate_Categories_Params) {
    let response = await this.execute(
      "aliexpress.affiliate.category.get",
      args,
    );
    if (response.ok) {
      let data =
        response.data.aliexpress_affiliate_category_get_response.resp_result
          .result.categories;
      if ((data as any).category) {
        data = (data as any).category;
      }
    }
    return response;
  }

  /**
   *
   * @link https://open.aliexpress.com/doc/api.htm#/api?cid=21407&path=aliexpress.affiliate.featuredpromo.get&methodType=GET/POST
   *
   */
  async featuredPromoInfo(args: Affiliate_Featuredpromo_Info_Params) {
    let response = await this.execute(
      "aliexpress.affiliate.featuredpromo.get",
      args,
    );
    if (response.ok) {
      let data =
        response.data.aliexpress_affiliate_featuredpromo_get_response
          .resp_result.result;
      if ((data.promos as any).promo) {
        data.promos = (data.promos as any).promo;
      }
    }
    return response;
  }

  /**
   *
   * @link https://open.aliexpress.com/doc/api.htm#/api?cid=21407&path=aliexpress.affiliate.featuredpromo.products.get&methodType=GET/POST
   *
   */
  async featuredPromoProducts(args: Affiliate_Featured_Promo_Products_Params) {
    let response = await this.execute(
      "aliexpress.affiliate.featuredpromo.products.get",
      args,
    );
    if (response.ok) {
      let data =
        response.data.aliexpress_affiliate_featuredpromo_products_get_response
          .resp_result.result;
      data = parse_affiliate_products(data);
    }
    return response;
  }

  /**
   *
   * @link https://open.aliexpress.com/doc/api.htm#/api?cid=21407&path=aliexpress.affiliate.hotproduct.download&methodType=GET/POST
   *
   */
  async getHotProductsDownload(args: Affiliate_Hotproducts_Download_Params) {
    let response = await this.execute(
      "aliexpress.affiliate.hotproduct.download",
      args,
    );
    if (response.ok) {
      let data =
        response.data.aliexpress_affiliate_hotproduct_download_response
          .resp_result.result;
      data = parse_affiliate_products(data);
    }
    return response;
  }

  /**
   *
   * @link https://open.aliexpress.com/doc/api.htm#/api?cid=21407&path=aliexpress.affiliate.hotproduct.query&methodType=GET/POST
   *
   */
  async getHotProducts(args: Affiliate_Products_Params) {
    let response = await this.execute(
      "aliexpress.affiliate.hotproduct.query",
      args,
    );
    if (response.ok) {
      let data =
        response.data.aliexpress_affiliate_hotproduct_query_response.resp_result
          .result;
      data = parse_affiliate_products(data);
    }
    return response;
  }

  /**
   *
   * @link https://open.aliexpress.com/doc/api.htm#/api?cid=21407&path=aliexpress.affiliate.order.get&methodType=GET/POST
   *
   */
  async orderInfo(args: Affiliate_Order_Info_Params) {
    return await this.execute("aliexpress.affiliate.order.get", args);
  }

  /**
   * @link https://open.aliexpress.com/doc/api.htm#/api?cid=21407&path=aliexpress.affiliate.order.list&methodType=GET/POST
   */
  async ordersList(args: Affiliate_Order_List_Params) {
    return await this.execute("aliexpress.affiliate.order.list", args);
  }

  /**
   * @link https://open.aliexpress.com/doc/api.htm#/api?cid=21407&path=aliexpress.affiliate.order.listbyindex&methodType=GET/POST
   */
  async ordersListByIndex(args: Affiliate_Order_List_ByIdx_Params) {
    return await this.execute("aliexpress.affiliate.order.listbyindex", args);
  }

  /**
   * @link https://open.aliexpress.com/doc/api.htm#/api?cid=21407&path=aliexpress.affiliate.productdetail.get&methodType=GET/POST
   */
  async productDetails(args: Affiliate_Product_Details_Params) {
    let response = await this.execute(
      "aliexpress.affiliate.productdetail.get",
      args,
    );
    if (response.ok) {
      let data =
        response.data.aliexpress_affiliate_productdetail_get_response
          .resp_result.result;
      data = parse_affiliate_products(data);
    }
    return response;
  }

  /**
   * @link https://open.aliexpress.com/doc/api.htm#/api?cid=21407&path=aliexpress.affiliate.product.query&methodType=GET/POST
   */
  async queryProducts(args: Affiliate_Products_Params) {
    let response = await this.execute(
      "aliexpress.affiliate.product.query",
      args,
    );
    if (response.ok) {
      let data =
        response.data.aliexpress_affiliate_product_query_response.resp_result
          .result;
      data = parse_affiliate_products(data);
    }
    return response;
  }

  /**
   * @link https://open.aliexpress.com/doc/api.htm#/api?cid=21407&path=aliexpress.affiliate.product.smartmatch&methodType=GET/POST
   */
  async smartMatchProducts(args: Affiliate_Smart_Match_Products_Params) {
    let response = await this.execute(
      "aliexpress.affiliate.product.smartmatch",
      args,
    );
    if (response.ok) {
      let data =
        response.data.aliexpress_affiliate_product_smartmatch_response
          .resp_result.result;
      data = parse_affiliate_products(data);
    }
    return response;
  }
}
