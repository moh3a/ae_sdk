import {
  AE_Base_Client,
  AE_Logistics_Address,
  AE_Product_Item,
  DS_ProductAPI_Recommended_Products_Params,
  DS_ProductAPI_Recommended_Products_Result,
  DS_ProductAPI_Product_Params,
  DS_ProductAPI_Product_Result,
  DS_ShippingAPI_Shipping_Info_Params,
  DS_ShippingAPI_Shipping_Info_Result,
  DS_ShippingAPI_Tracking_Info_Result,
  DS_ShippingAPI_Tracking_Info_Params,
  DS_OrderAPI_Place_Order_Result,
  DS_OrderAPI_Get_Order_Params,
  DS_OrderAPI_Get_Order_Result,
} from "../types";
import { AESystemClient } from "./system_client";

export class AEDSClient extends AESystemClient {
  constructor(init: AE_Base_Client) {
    super(init);
  }

  /**
   * @link https://open.aliexpress.com/doc/api.htm#/api?cid=21038&path=aliexpress.logistics.buyer.freight.calculate&methodType=GET/POST
   */
  async shippingInfo(
    args: DS_ShippingAPI_Shipping_Info_Params,
  ): Promise<DS_ShippingAPI_Shipping_Info_Result | undefined> {
    return await this.execute(
      "aliexpress.logistics.buyer.freight.calculate",
      args,
    );
  }

  /**
   * @link https://open.aliexpress.com/doc/api.htm#/api?cid=21038&path=aliexpress.logistics.ds.trackinginfo.query&methodType=GET/POST
   */
  async trackingInfo(
    args: DS_ShippingAPI_Tracking_Info_Params,
  ): Promise<DS_ShippingAPI_Tracking_Info_Result | undefined> {
    return await this.execute(
      "aliexpress.logistics.ds.trackinginfo.query",
      args,
    );
  }

  /**
   * @link https://open.aliexpress.com/doc/api.htm#/api?cid=21038&path=aliexpress.ds.add.info&methodType=GET/POST
   */
  // todo: add ds info

  /**
   * @link https://open.aliexpress.com/doc/api.htm#/api?cid=21038&path=aliexpress.ds.image.search&methodType=GET/POST
   */
  // todo: ae dropshiper image search

  /**
   * @link https://open.aliexpress.com/doc/api.htm#/api?cid=21038&path=aliexpress.ds.recommend.feed.get&methodType=GET/POST
   */
  async queryfeaturedPromoProducts(
    args: DS_ProductAPI_Recommended_Products_Params,
  ): Promise<DS_ProductAPI_Recommended_Products_Result | undefined> {
    return await this.execute("aliexpress.ds.recommend.feed.get", args);
  }

  /**
   * @link https://open.aliexpress.com/doc/api.htm#/api?cid=21038&path=aliexpress.trade.buy.placeorder&methodType=GET/POST
   */
  async createOrder({
    logistics_address,
    product_items,
  }: {
    logistics_address: AE_Logistics_Address;
    product_items: AE_Product_Item[];
  }): Promise<DS_OrderAPI_Place_Order_Result | undefined> {
    return await this.execute("aliexpress.trade.buy.placeorder", {
      param_place_order_request4_open_api_d_t_o: JSON.stringify({
        logistics_address,
        product_items,
      }),
    });
  }

  /**
   * @link https://open.aliexpress.com/doc/api.htm#/api?cid=21038&path=aliexpress.trade.ds.order.get&methodType=GET/POST
   */
  async orderDetails(
    args: DS_OrderAPI_Get_Order_Params,
  ): Promise<DS_OrderAPI_Get_Order_Result | undefined> {
    return await this.execute("aliexpress.ds.trade.order.get", args);
  }

  /**
   * @link https://open.aliexpress.com/doc/api.htm#/api?cid=21038&path=aliexpress.ds.feedname.get&methodType=GET/POST
   */
  // todo: add ds feedname get

  /**
   * @link https://open.aliexpress.com/doc/api.htm#/api?cid=21038&path=aliexpress.ds.category.get&methodType=GET/POST
   */
  // todo: add ds get category

  /**
   * @link https://open.aliexpress.com/doc/api.htm#/api?cid=21038&path=aliexpress.ds.commissionorder.listbyindex&methodType=GET/POST
   */
  // todo: add ds order query by index

  /**
   * @link https://open.aliexpress.com/doc/api.htm#/api?cid=21038&path=aliexpress.ds.member.orderdata.submit&methodType=GET/POST
   */
  // todo: add ds order submit

  /**
   * @link https://open.aliexpress.com/doc/api.htm#/api?cid=21038&path=aliexpress.ds.recommend.feed.get&methodType=GET/POST
   */
  async productDetails(
    args: DS_ProductAPI_Product_Params,
  ): Promise<DS_ProductAPI_Product_Result | undefined> {
    return await this.execute("aliexpress.ds.product.get", args);
  }
}
