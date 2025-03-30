/**
 * @fileoverview
 * AliExpress Dropshipper API client implementation.
 * This file contains the client for interacting with AliExpress Dropshipping API endpoints,
 * handling authentication, request execution, and response normalization for easier consumption.
 *
 * The client normalizes nested API responses using utility functions like extractNestedArray
 * and extractNestedProperty to ensure consistent data structures regardless of the variations
 * in the AliExpress API responses.
 */

import {
  extractNestedArray,
  extractNestedProperty,
  parseAffiliateProducts,
} from ".";
import type {
  AE_Base_Client,
  AE_Logistics_Address,
  AE_Product_Item,
  DS_Recommended_Products_Params,
  DS_Product_Params,
  DS_Shipping_Info_Arguments,
  DS_Tracking_Info_Params,
  DS_Get_Order_Params,
  DS_Feedname_Params,
  Affiliate_Categories_Params,
  DS_Orders_ByIdx_Params,
  DS_Order_Submit_Params,
  DS_Add_Info_Arguments,
  DS_Freight_Calculation_Arguments,
  AE_Place_Order_Payment_Params,
} from "../types";
import { AESystemClient } from "./system_client";

/**
 * Client for interacting with AliExpress Dropshipping API endpoints.
 *
 * This class provides methods to access various AliExpress API endpoints related to
 * dropshipping, including product details, order management, logistics, tracking,
 * and other operations. It handles the authentication and normalization
 * of API responses to provide consistent data structures.
 *
 * @extends AESystemClient Base client with authentication and request execution capabilities
 */
export class DropshipperClient extends AESystemClient {
  constructor(init: AE_Base_Client) {
    super(init);
  }

  /**
   * @deprecated - this was removed from the API
   *
   * Retrieves freight information for products
   *
   * AE API endpoint: `aliexpress.logistics.buyer.freight.get`
   *
   * @param args Freight calculation parameters including product and shipping details
   * @returns API response with freight calculation results
   * @link https://openservice.aliexpress.com/doc/api.htm#/api?cid=21038&path=aliexpress.logistics.buyer.freight.get&methodType=GET/POST
   */
  async freightInfo(args: DS_Freight_Calculation_Arguments) {
    let response = await this.execute(
      "aliexpress.logistics.buyer.freight.get",
      {
        aeopFreightCalculateForBuyerDTO: JSON.stringify(args),
      },
    );

    if (response.ok) {
      const data =
        response.data.aliexpress_logistics_buyer_freight_get_response;
      if (
        data.result.success &&
        data.result.aeop_freight_calculate_result_for_buyer_dtolist
      ) {
        data.result.aeop_freight_calculate_result_for_buyer_dtolist =
          extractNestedArray(
            data.result.aeop_freight_calculate_result_for_buyer_dtolist,
            "aeop_freight_calculate_result_for_buyer_d_t_o",
          );
      }
    }

    return response;
  }

  /**
   * Calculates shipping costs for buyer-selected options
   *
   * Uses the AliExpress shipping calculation API to get available shipping methods
   * and their associated costs based on product, quantity, and destination.
   *
   * @param args Shipping information parameters including product and destination details
   * @returns API response with available shipping methods and costs
   * @link https://open.aliexpress.com/doc/api.htm#/api?cid=21038&path=aliexpress.logistics.buyer.freight.calculate&methodType=GET/POST
   */
  async shippingInfo(args: DS_Shipping_Info_Arguments) {
    let response = await this.execute(
      "aliexpress.logistics.buyer.freight.calculate",
      {
        param_aeop_freight_calculate_for_buyer_d_t_o: JSON.stringify(args),
      },
    );

    if (response.ok) {
      const data =
        response.data.aliexpress_logistics_buyer_freight_calculate_response;
      if (
        data.result.success &&
        data.result.aeop_freight_calculate_result_for_buyer_d_t_o_list
      ) {
        data.result.aeop_freight_calculate_result_for_buyer_d_t_o_list =
          extractNestedArray(
            data.result.aeop_freight_calculate_result_for_buyer_d_t_o_list,
            "aeop_freight_calculate_result_for_buyer_dto",
          );
      }
    }

    return response;
  }

  /**
   * @deprecated - this was removed from the API
   *
   * Retrieves tracking information for an order
   *
   * Gets detailed tracking events for a shipment using the order ID
   * and logistics tracking number.
   *
   * @param args Tracking information parameters including order ID and tracking number
   * @returns API response with tracking details and events
   * @link https://open.aliexpress.com/doc/api.htm#/api?cid=21038&path=aliexpress.logistics.ds.trackinginfo.query&methodType=GET/POST
   */
  async trackingInfo(args: DS_Tracking_Info_Params) {
    let response = await this.execute(
      "aliexpress.logistics.ds.trackinginfo.query",
      args,
    );

    if (
      response.ok &&
      response.data.aliexpress_logistics_ds_trackinginfo_query_response
        .result_success
    ) {
      const data =
        response.data.aliexpress_logistics_ds_trackinginfo_query_response;
      data.details = extractNestedProperty(data.details, "details") ?? [];
    }

    return response;
  }

  // TODO : add new tracking info API route
  // https://openservice.aliexpress.com/doc/doc.htm#/?docId=1660

  /**
   * @deprecated - this was removed from the API
   *
   * Adds dropshipping information to an order
   *
   * @param args Dropshipping information parameters
   * @returns API response with operation result
   * @link https://open.aliexpress.com/doc/api.htm#/api?cid=21038&path=aliexpress.ds.add.info&methodType=GET/POST
   */
  async addDropshippingInfo(args: DS_Add_Info_Arguments) {
    return await this.execute("aliexpress.ds.add.info", {
      param0: JSON.stringify(args),
    });
  }

  /**
   * @link https://open.aliexpress.com/doc/api.htm#/api?cid=21038&path=aliexpress.ds.image.search&methodType=GET/POST
   */
  // TODO
  // async searchByImage(args: DS_Image_Search_Params) {
  //   let response = await this.execute("aliexpress.ds.image.search", args);
  //   if (response.ok) {
  //     let data = response.data.aliexpress_ds_image_search_response.data;
  //     data = parseAffiliateProducts(data);
  //   }
  //   return response;
  // }

  /**
   * @deprecated - this was removed from the API
   *
   * Retrieves recommended products from featured promotions
   *
   * @param args Parameters for filtering and pagination of recommended products
   * @returns API response with recommended products
   * @link https://open.aliexpress.com/doc/api.htm#/api?cid=21038&path=aliexpress.ds.recommend.feed.get&methodType=GET/POST
   */
  async queryfeaturedPromoProducts(args: DS_Recommended_Products_Params) {
    let response = await this.execute("aliexpress.ds.recommend.feed.get", args);
    if (response.ok) {
      response.data.aliexpress_ds_recommend_feed_get_response.resp_result.result =
        parseAffiliateProducts(
          response.data.aliexpress_ds_recommend_feed_get_response.resp_result
            .result,
        );
    }
    return response;
  }

  /**
   * Creates a new order on AliExpress
   *
   * Places an order with the specified shipping address and product items.
   * This is the main endpoint for creating dropshipping orders.
   *
   * @param params Object containing logistics_address (shipping details) and product_items (products to order)
   * @returns API response with order creation result, including order numbers
   * @link https://openservice.aliexpress.com/doc/api.htm#/api?cid=21038&path=aliexpress.ds.order.create&methodType=GET/POST
   */
  async createOrder({
    logistics_address,
    product_items,
    promo_and_payment,
  }: {
    logistics_address: AE_Logistics_Address;
    product_items: AE_Product_Item[];
    promo_and_payment?: AE_Place_Order_Payment_Params;
  }) {
    let response = await this.execute("aliexpress.ds.order.create", {
      ds_extend_request: JSON.stringify(promo_and_payment),
      param_place_order_request4_open_api_d_t_o: JSON.stringify({
        logistics_address,
        product_items,
      }),
    });

    if (
      response.ok &&
      response.data.aliexpress_trade_buy_placeorder_response.result.is_success
    ) {
      response.data.aliexpress_trade_buy_placeorder_response.result.order_list =
        extractNestedProperty(
          response.data.aliexpress_trade_buy_placeorder_response.result
            .order_list,
          "number",
        ) ?? [];
    }

    return response;
  }

  /**
   * Retrieves detailed information about an order
   *
   * Gets comprehensive order details including products, shipping information,
   * payment status, and other order-related data.
   *
   * @param args Parameters for order retrieval, including order ID
   * @returns API response with complete order details
   * @link https://open.aliexpress.com/doc/api.htm#/api?cid=21038&path=aliexpress.trade.ds.order.get&methodType=GET/POST
   */
  async orderDetails(args: DS_Get_Order_Params) {
    let response = await this.execute("aliexpress.trade.ds.order.get", args);

    if (response.ok) {
      response.data.aliexpress_trade_ds_order_get_response =
        extractNestedProperty(
          response.data,
          "aliexpress_ds_trade_order_get_response",
        ) || response.data.aliexpress_trade_ds_order_get_response;

      // @ts-ignore
      if (response.data.aliexpress_ds_trade_order_get_response) {
        delete (response.data as any).aliexpress_ds_trade_order_get_response;
      }

      let data = response.data.aliexpress_trade_ds_order_get_response.result;

      if ("child_order_list" in data && data.child_order_list) {
        data.child_order_list = extractNestedArray(
          data.child_order_list,
          "ae_child_order_info",
        );
      }

      if (data.logistics_info_list) {
        data.logistics_info_list = extractNestedArray(
          data.logistics_info_list,
          "ae_order_logistics_info",
        );
      }
    }

    return response;
  }

  /**
   * Retrieves available featured promotions
   *
   * Gets a list of current promotional campaigns available for dropshippers,
   * which can be used to find discounted products.
   *
   * @param args Parameters for filtering and pagination of promotions
   * @returns API response with available promotions
   * @link https://open.aliexpress.com/doc/api.htm#/api?cid=21038&path=aliexpress.ds.feedname.get&methodType=GET/POST
   */
  async queryFeaturedPromos(args: DS_Feedname_Params) {
    let response = await this.execute("aliexpress.ds.feedname.get", args);
    if (response.ok) {
      let data =
        response.data.aliexpress_ds_feedname_get_response.result.promos;
      data = extractNestedArray(data, "promo");
    }
    return response;
  }

  /**
   * Retrieves AliExpress category information
   *
   * Gets hierarchical category data that can be used for product browsing
   * or filtering in dropshipping applications.
   *
   * @param args Parameters for retrieving category information
   * @returns API response with category data
   * @link https://open.aliexpress.com/doc/api.htm#/api?cid=21038&path=aliexpress.ds.category.get&methodType=GET/POST
   */
  async getCategories(args: Affiliate_Categories_Params) {
    let response = await this.execute("aliexpress.ds.category.get", args);
    if (response.ok) {
      let data =
        response.data.aliexpress_ds_category_get_response.resp_result.result
          .categories;
      data = extractNestedArray(data, "category");
    }
    return response;
  }

  /**
   * @deprecated - this was removed from the API
   *
   * Retrieves a list of orders by index
   *
   * Gets paginated orders based on specified filters and sorting parameters.
   * Useful for building order management interfaces.
   *
   * @param args Parameters for filtering and pagination of orders
   * @returns API response with list of orders
   * @link https://open.aliexpress.com/doc/api.htm#/api?cid=21038&path=aliexpress.ds.commissionorder.listbyindex&methodType=GET/POST
   */
  async ordersListByIndex(args: DS_Orders_ByIdx_Params) {
    return await this.execute(
      "aliexpress.ds.commissionorder.listbyindex",
      args,
    );
  }

  /**
   * @deprecated - this was removed from the API
   *
   * Submits order data to AliExpress
   *
   * Submits additional information about orders, such as tracking data
   * or customer information for dropshipping purposes.
   *
   * @param args Order data to submit
   * @returns API response with submission result
   * @link https://open.aliexpress.com/doc/api.htm#/api?cid=21038&path=aliexpress.ds.member.orderdata.submit&methodType=GET/POST
   */
  async submitOrderData(args: DS_Order_Submit_Params) {
    return await this.execute("aliexpress.ds.member.orderdata.submit", args);
  }

  /**
   * Retrieves detailed product information
   *
   * Gets comprehensive information about a product, including pricing,
   * variations, shipping options, seller information, and other product details.
   * This is a core API for dropshipping product sourcing.
   *
   * @param args Parameters for product retrieval, including product ID
   * @returns API response with complete product details
   * @link https://open.aliexpress.com/doc/api.htm#/api?cid=21038&path=aliexpress.ds.product.get&methodType=GET/POST
   */
  async productDetails(args: DS_Product_Params) {
    let response = await this.execute("aliexpress.ds.product.get", args);
    if (response.ok) {
      const data = response.data.aliexpress_ds_product_get_response.result;
      // Fix weird AE API responses into a predefined struct
      data.ae_item_properties = extractNestedArray(
        data.ae_item_properties,
        "ae_item_property",
      );

      data.ae_item_sku_info_dtos = extractNestedArray(
        data.ae_item_sku_info_dtos,
        "ae_item_sku_info_d_t_o",
      );

      data.ae_item_sku_info_dtos.forEach((sku) => {
        if ((sku as any).ae_sku_property_dtos) {
          sku.aeop_s_k_u_propertys = (sku as any).ae_sku_property_dtos;
          delete (sku as any).ae_sku_property_dtos;
        }

        sku.aeop_s_k_u_propertys = extractNestedArray(
          sku.aeop_s_k_u_propertys,
          "ae_sku_property_d_t_o",
        );
      });

      if (data.ae_multimedia_info_dto?.ae_video_dtos) {
        data.ae_multimedia_info_dto.ae_video_dtos = extractNestedArray(
          data.ae_multimedia_info_dto.ae_video_dtos,
          "ae_video_d_t_o",
        );
      }
    }
    return response;
  }
}
