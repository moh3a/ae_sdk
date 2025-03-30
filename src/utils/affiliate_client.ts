/**
 * @fileoverview
 * AliExpress Affiliate API client implementation.
 * This file contains the client for interacting with AliExpress Affiliate API endpoints,
 * handling authentication, request execution, and response normalization.
 *
 * The Affiliate API allows integrators to access product data, generate affiliate links,
 * track orders, and earn commissions on referred sales through the AliExpress platform.
 *
 * Similar to the DropshipperClient, this client normalizes nested API responses
 * to provide consistent data structures regardless of variations in the AliExpress API responses.
 */

import { parseAffiliateProducts } from ".";
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

/**
 * Client for interacting with AliExpress Affiliate API endpoints.
 *
 * This class provides methods to access AliExpress Affiliate API features including
 * product discovery, affiliate link generation, commission information,
 * and other affiliate marketing operations. It handles authentication and normalizes
 * API responses to provide consistent data structures.
 *
 * The Affiliate API is designed for affiliate marketers who promote AliExpress products
 * and earn commissions, rather than for dropshippers or direct sellers.
 *
 * @extends AESystemClient Base client with authentication and request execution capabilities
 */
export class AffiliateClient extends AESystemClient {
  constructor(init: AE_Base_Client) {
    super(init);
  }

  /**
   * Generates affiliate tracking links for products
   *
   * Creates trackable affiliate links that can be used in marketing campaigns,
   * websites, or social media to earn commissions on referred sales.
   *
   * @param args Parameters including product IDs, tracking ID, and promotion types
   * @returns API response with generated affiliate links
   * @link https://open.aliexpress.com/doc/api.htm#/api?cid=21407&path=aliexpress.affiliate.link.generate&methodType=GET/POST
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
   * Retrieves AliExpress category information for affiliate products
   *
   * Gets hierarchical category data that can be used for product browsing,
   * filtering, or creating category-specific affiliate campaigns.
   *
   * @param args Parameters for retrieving category information
   * @returns API response with category data
   * @link https://open.aliexpress.com/doc/api.htm#/api?cid=21407&path=aliexpress.affiliate.category.get&methodType=GET/POST
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
   * Retrieves information about current featured promotions
   *
   * Gets details about ongoing promotional campaigns, sales events, and
   * special offers that affiliates can promote to earn higher commissions.
   *
   * @param args Parameters for filtering and pagination of promotion information
   * @returns API response with promotion details
   * @link https://open.aliexpress.com/doc/api.htm#/api?cid=21407&path=aliexpress.affiliate.featuredpromo.get&methodType=GET/POST
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
   * Retrieves products from a specific featured promotion
   *
   * Gets a list of products included in a particular promotional campaign or sale event,
   * which can be used to create targeted affiliate marketing campaigns.
   *
   * @param args Parameters for specifying the promotion and filtering products
   * @returns API response with products in the specified promotion
   * @link https://open.aliexpress.com/doc/api.htm#/api?cid=21407&path=aliexpress.affiliate.featuredpromo.products.get&methodType=GET/POST
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
      data = parseAffiliateProducts(data);
    }
    return response;
  }

  /**
   * Gets information about trending products for affiliate marketing
   *
   * @param args Parameters for filtering hot products by category, commission rate, etc.
   * @returns API response with hot product download information
   * @link https://open.aliexpress.com/doc/api.htm#/api?cid=21407&path=aliexpress.affiliate.hotproduct.download&methodType=GET/POST
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
      data = parseAffiliateProducts(data);
    }
    return response;
  }

  /**
   * Retrieves a list of trending products for affiliate marketing
   *
   * Gets products that are currently popular on AliExpress with high sales volume
   * and conversion rates, making them good candidates for affiliate promotion.
   *
   * @param args Parameters for filtering and pagination of hot products
   * @returns API response with list of hot products
   * @link https://open.aliexpress.com/doc/api.htm#/api?cid=21407&path=aliexpress.affiliate.hotproduct.query&methodType=GET/POST
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
      data = parseAffiliateProducts(data);
    }
    return response;
  }

  /**
   * Retrieves detailed information about a specific affiliate order
   *
   * Gets comprehensive details about an order placed through an affiliate link,
   * including commission information, order status, and product details.
   *
   * @param args Parameters for order retrieval, including order ID
   * @returns API response with complete order details
   * @link https://open.aliexpress.com/doc/api.htm#/api?cid=21407&path=aliexpress.affiliate.order.get&methodType=GET/POST
   */
  async orderInfo(args: Affiliate_Order_Info_Params) {
    return await this.execute("aliexpress.affiliate.order.get", args);
  }

  /**
   * Retrieves a list of affiliate orders based on specified criteria
   *
   * Gets information about multiple orders placed through affiliate links,
   * filtered by date range, status, or other parameters.
   *
   * @param args Parameters for filtering and pagination of orders
   * @returns API response with list of orders
   * @link https://open.aliexpress.com/doc/api.htm#/api?cid=21407&path=aliexpress.affiliate.order.list&methodType=GET/POST
   */
  async ordersList(args: Affiliate_Order_List_Params) {
    return await this.execute("aliexpress.affiliate.order.list", args);
  }

  /**
   * Retrieves a paginated list of affiliate orders by index
   *
   * Gets a paginated list of orders for easier navigation through large sets of order data,
   * using index-based pagination instead of time-based filtering.
   *
   * @param args Parameters for index-based pagination of orders
   * @returns API response with paginated list of orders
   * @link https://open.aliexpress.com/doc/api.htm#/api?cid=21407&path=aliexpress.affiliate.order.listbyindex&methodType=GET/POST
   */
  async ordersListByIndex(args: Affiliate_Order_List_ByIdx_Params) {
    return await this.execute("aliexpress.affiliate.order.listbyindex", args);
  }

  /**
   * Retrieves detailed information about a specific product for affiliate marketing
   *
   * Gets comprehensive product details including pricing, commission rates,
   * images, descriptions, and other information needed for effective affiliate promotion.
   *
   * @param args Parameters for product retrieval, including product ID
   * @returns API response with complete product details formatted for affiliate use
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
      data = parseAffiliateProducts(data);
    }
    return response;
  }

  /**
   * Searches for products available for affiliate promotion
   *
   * Searches the AliExpress catalog for products that can be promoted through
   * the affiliate program, with filtering by category, price, commission rate, etc.
   *
   * @param args Parameters for product search and filtering
   * @returns API response with product search results
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
      data = parseAffiliateProducts(data);
    }
    return response;
  }

  /**
   * Finds similar products that match given criteria
   *
   * Uses intelligent matching to find products similar to provided keywords, URLs,
   * or product IDs, which can be used to diversify affiliate product offerings.
   *
   * @param args Parameters for smart matching, including keywords or reference products
   * @returns API response with matched products
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
      data = parseAffiliateProducts(data);
    }
    return response;
  }
}
