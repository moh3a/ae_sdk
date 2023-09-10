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

  async queryProducts(
    args: DS_ProductAPI_Recommended_Products_Params,
  ): Promise<DS_ProductAPI_Recommended_Products_Result | undefined> {
    return await this.execute("aliexpress.ds.recommend.feed.get", args);
  }

  async productDetails(
    args: DS_ProductAPI_Product_Params,
  ): Promise<DS_ProductAPI_Product_Result | undefined> {
    return await this.execute("aliexpress.ds.product.get", args);
  }

  async shippingInfo(
    args: DS_ShippingAPI_Shipping_Info_Params,
  ): Promise<DS_ShippingAPI_Shipping_Info_Result | undefined> {
    return await this.execute(
      "aliexpress.logistics.buyer.freight.calculate",
      args,
    );
  }

  async trackingInfo(
    args: DS_ShippingAPI_Tracking_Info_Params,
  ): Promise<DS_ShippingAPI_Tracking_Info_Result | undefined> {
    return await this.execute(
      "aliexpress.logistics.ds.trackinginfo.query",
      args,
    );
  }

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

  async orderDetails(
    args: DS_OrderAPI_Get_Order_Params,
  ): Promise<DS_OrderAPI_Get_Order_Result | undefined> {
    return await this.execute("aliexpress.ds.trade.order.get", args);
  }
}
