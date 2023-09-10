import { AENOLogisticsAddress, AENOProductItem } from "../types";
import {
  AE_DS_EXECUTE_FN_PARAMS,
  AE_DS_EXECUTE_FN_RESULT,
  DS_API_NAMES,
  AE_Base_Client,
  PublicParams,
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
} from "../types/ae";
import { AEBaseClient } from "./client";

interface IAEDSClientSession extends AE_Base_Client {
  session: string;
}

export class AEDSClient extends AEBaseClient implements IAEDSClientSession {
  readonly session: string;

  constructor(init: IAEDSClientSession) {
    super({
      ...init,
    });
    this.session = init.session;
  }

  protected async execute<K extends DS_API_NAMES>(
    method: K,
    params: AE_DS_EXECUTE_FN_PARAMS<K>,
  ) {
    const parameters: AE_DS_EXECUTE_FN_PARAMS<K> & PublicParams = {
      ...params,
      app_key: this.app_key,
      access_token: this.session,
      simplify: true,
      sign_method: this.sign_method,
      timestamp: Date.now().toString(),
    };
    parameters.sign = this.sign(method, parameters);

    return await this.call<
      AE_DS_EXECUTE_FN_PARAMS<K> & PublicParams,
      AE_DS_EXECUTE_FN_RESULT<K>
    >(method, parameters);
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
    logistics_address: AENOLogisticsAddress;
    product_items: AENOProductItem[];
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
