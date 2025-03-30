import type {
  AES_Generate_Security_Token_Params,
  AES_Generate_Security_Token_Result,
  AES_Generate_Token_Params,
  AES_Generate_Token_Result,
  AES_Refresh_Security_Token_Params,
  AES_Refresh_Security_Token_Result,
  AES_Refresh_Token_Params,
  AES_Refresh_Token_Result,
  Affiliate_Categories_Params,
  Affiliate_Categories_Result,
  Affiliate_Featured_Promo_Products_Params,
  Affiliate_Featured_Promo_Products_Result,
  Affiliate_Featuredpromo_Info_Params,
  Affiliate_Featuredpromo_Info_Result,
  Affiliate_Generate_Affiliate_Links_Params,
  Affiliate_Generate_Affiliate_Links_Result,
  Affiliate_Hotproducts_Download_Params,
  Affiliate_Hotproducts_Download_Result,
  Affiliate_Hotproducts_Params,
  Affiliate_Hotproducts_Result,
  Affiliate_Order_Info_Params,
  Affiliate_Order_Info_Result,
  Affiliate_Order_List_ByIdx_Params,
  Affiliate_Order_List_ByIdx_Result,
  Affiliate_Order_List_Params,
  Affiliate_Order_List_Result,
  Affiliate_Product_Details_Params,
  Affiliate_Product_Details_Result,
  Affiliate_Products_Params,
  Affiliate_Products_Result,
  Affiliate_Smart_Match_Products_Params,
  Affiliate_Smart_Match_Products_Result,
  DS_Add_Info_Params,
  DS_Add_Info_Result,
  DS_Feedname_Params,
  DS_Feedname_Result,
  DS_Image_Search_Params,
  DS_Image_Search_Result,
  DS_Get_Order_Params,
  DS_Get_Order_Result,
  DS_Place_Order_Params,
  DS_Place_Order_Result,
  DS_Order_Submit_Params,
  DS_Order_Submit_Result,
  DS_Orders_ByIdx_Params,
  DS_Orders_ByIdx_Result,
  DS_Product_Params,
  DS_Product_Result,
  DS_Recommended_Products_Params,
  DS_Recommended_Products_Result,
  DS_Shipping_Info_Params,
  DS_Shipping_Info_Result,
  DS_Tracking_Info_Params,
  DS_Tracking_Info_Result,
  DS_Categories_Result,
  DS_Freight_Calculation_Params,
  DS_Freight_Calculation_Result,
} from ".";

export type AE_API_NAMES =
  | DS_API_NAMES
  | AFFILIATE_API_NAMES
  | SYSTEM_API_NAMES;

export type DS_API_NAMES =
  | "aliexpress.logistics.buyer.freight.get"
  | "aliexpress.logistics.buyer.freight.calculate"
  | "aliexpress.logistics.ds.trackinginfo.query"
  | "aliexpress.ds.add.info"
  | "aliexpress.ds.image.search"
  | "aliexpress.ds.recommend.feed.get"
  | "aliexpress.ds.order.create"
  | "aliexpress.trade.ds.order.get"
  | "aliexpress.ds.feedname.get"
  | "aliexpress.ds.category.get"
  | "aliexpress.ds.commissionorder.listbyindex"
  | "aliexpress.ds.member.orderdata.submit"
  | "aliexpress.ds.product.get";

export type AFFILIATE_API_NAMES =
  | "aliexpress.affiliate.link.generate"
  | "aliexpress.affiliate.category.get"
  | "aliexpress.affiliate.featuredpromo.get"
  | "aliexpress.affiliate.featuredpromo.products.get"
  | "aliexpress.affiliate.hotproduct.download"
  | "aliexpress.affiliate.hotproduct.query"
  | "aliexpress.affiliate.order.get"
  | "aliexpress.affiliate.order.list"
  | "aliexpress.affiliate.order.listbyindex"
  | "aliexpress.affiliate.productdetail.get"
  | "aliexpress.affiliate.product.query"
  | "aliexpress.affiliate.product.smartmatch";

export type SYSTEM_API_NAMES =
  | "/auth/token/security/create"
  | "/auth/token/create"
  | "/auth/token/security/refresh"
  | "/auth/token/refresh";

/**
 * Public parameters
 * @description Public parameters need to be set for every Aliexpress API
 * @param {String} method Indicates the API name.
 * @param {String | undefined} app_key Indicates the AppKey allocated by the TOP to an application. An ISV can choose Open Platform Console > Application Management > Overview to check the AppKey and AppSecret of the formal environment.
 * @param {String} session Indicates the authorization granted by the TOP to an application after a user logs in and grants authorization successfully.
 * @param {String} timestamp Indicates the time stamp in the format of yyyy-MM-dd HH:mm:ss and in the time zone of GMT+8. For example, 2016-01-01 12:00:00. The Taobao API server allows a maximum time error of 10 minutes for a request from a client.
 * @param {Boolean} simplify Indicates whether the simplified JSON return format is used. This parameter is valid only if format is set to json. The default value is false.
 * @param {String} sign_method Indicates the signature digest algorithm. The value can be set to hmac or md5.
 * @param {String} sign Indicates the obtained signature of API input parameters.
 */
export interface PublicParams {
  app_key: string;
  session: string;
  timestamp: number;
  sign_method: "hmac" | "md5" | "sha256";
  method: AE_API_NAMES;
  sign?: string;
  simplify?: boolean;
}

export interface AE_Base_Client {
  /**
   * @param {String} app_key Indicates the AppKey allocated by Open.Aliexpress to an application. An ISV can choose Open Platform Console > Application Management > Overview to check the AppKey and AppSecret of the formal environment.
   * @link https://open.aliexpress.com/doc/doc.htm?nodeId=27493&docId=118729#/?docId=732
   */
  app_key: string;
  /**
   * @param {String} app_key Indicates the AppSecret allocated by Open.Aliexpress to an application. An ISV can choose Open Platform Console > Application Management > Overview to check the AppKey and AppSecret of the formal environment.
   * @link https://open.aliexpress.com/doc/doc.htm?nodeId=27493&docId=118729#/?docId=732
   */
  app_secret: string;
  /**
   * @param {String} session Indicates the authorization granted by the TOP to an application after a user logs in and grants authorization successfully.
   * @link https://open.aliexpress.com/doc/doc.htm?nodeId=27493&docId=118729#/?docId=730
   */
  session: string;
}

export type AliexpressMethod<T extends AE_API_NAMES> =
  T extends "/auth/token/security/create"
    ? {
        method: T;
        params: AES_Generate_Security_Token_Params;
        result: AES_Generate_Security_Token_Result;
      }
    : T extends "/auth/token/create"
    ? {
        method: T;
        params: AES_Generate_Token_Params;
        result: AES_Generate_Token_Result;
      }
    : T extends "/auth/token/security/refresh"
    ? {
        method: T;
        params: AES_Refresh_Security_Token_Params;
        result: AES_Refresh_Security_Token_Result;
      }
    : T extends "/auth/token/refresh"
    ? {
        method: "/auth/token/refresh";
        params: AES_Refresh_Token_Params;
        result: AES_Refresh_Token_Result;
      }
    : T extends "aliexpress.logistics.buyer.freight.get"
    ? {
        method: T;
        params: DS_Freight_Calculation_Params;
        result: DS_Freight_Calculation_Result;
      }
    : T extends "aliexpress.logistics.buyer.freight.calculate"
    ? {
        method: T;
        params: DS_Shipping_Info_Params;
        result: DS_Shipping_Info_Result;
      }
    : T extends "aliexpress.logistics.ds.trackinginfo.query"
    ? {
        method: T;
        params: DS_Tracking_Info_Params;
        result: DS_Tracking_Info_Result;
      }
    : T extends "aliexpress.ds.add.info"
    ? { method: T; params: DS_Add_Info_Params; result: DS_Add_Info_Result }
    : T extends "aliexpress.ds.image.search"
    ? {
        method: T;
        params: DS_Image_Search_Params;
        result: DS_Image_Search_Result;
      }
    : T extends "aliexpress.ds.recommend.feed.get"
    ? {
        method: T;
        params: DS_Recommended_Products_Params;
        result: DS_Recommended_Products_Result;
      }
    : T extends "aliexpress.ds.order.create"
    ? {
        method: T;
        params: DS_Place_Order_Params;
        result: DS_Place_Order_Result;
      }
    : T extends "aliexpress.trade.ds.order.get"
    ? {
        method: T;
        params: DS_Get_Order_Params;
        result: DS_Get_Order_Result;
      }
    : T extends "aliexpress.ds.feedname.get"
    ? { method: T; params: DS_Feedname_Params; result: DS_Feedname_Result }
    : T extends "aliexpress.ds.category.get"
    ? {
        method: T;
        params: Affiliate_Categories_Params;
        result: DS_Categories_Result;
      }
    : T extends "aliexpress.ds.commissionorder.listbyindex"
    ? {
        method: T;
        params: DS_Orders_ByIdx_Params;
        result: DS_Orders_ByIdx_Result;
      }
    : T extends "aliexpress.ds.member.orderdata.submit"
    ? {
        method: T;
        params: DS_Order_Submit_Params;
        result: DS_Order_Submit_Result;
      }
    : T extends "aliexpress.ds.product.get"
    ? {
        method: T;
        params: DS_Product_Params;
        result: DS_Product_Result;
      }
    : T extends "aliexpress.affiliate.link.generate"
    ? {
        method: T;
        params: Affiliate_Generate_Affiliate_Links_Params;
        result: Affiliate_Generate_Affiliate_Links_Result;
      }
    : T extends "aliexpress.affiliate.category.get"
    ? {
        method: T;
        params: Affiliate_Categories_Params;
        result: Affiliate_Categories_Result;
      }
    : T extends "aliexpress.affiliate.featuredpromo.get"
    ? {
        method: T;
        params: Affiliate_Featuredpromo_Info_Params;
        result: Affiliate_Featuredpromo_Info_Result;
      }
    : T extends "aliexpress.affiliate.featuredpromo.products.get"
    ? {
        method: T;
        params: Affiliate_Featured_Promo_Products_Params;
        result: Affiliate_Featured_Promo_Products_Result;
      }
    : T extends "aliexpress.affiliate.hotproduct.download"
    ? {
        method: T;
        params: Affiliate_Hotproducts_Download_Params;
        result: Affiliate_Hotproducts_Download_Result;
      }
    : T extends "aliexpress.affiliate.hotproduct.query"
    ? {
        method: T;
        params: Affiliate_Hotproducts_Params;
        result: Affiliate_Hotproducts_Result;
      }
    : T extends "aliexpress.affiliate.order.get"
    ? {
        method: T;
        params: Affiliate_Order_Info_Params;
        result: Affiliate_Order_Info_Result;
      }
    : T extends "aliexpress.affiliate.order.list"
    ? {
        method: T;
        params: Affiliate_Order_List_Params;
        result: Affiliate_Order_List_Result;
      }
    : T extends "aliexpress.affiliate.order.listbyindex"
    ? {
        method: T;
        params: Affiliate_Order_List_ByIdx_Params;
        result: Affiliate_Order_List_ByIdx_Result;
      }
    : T extends "aliexpress.affiliate.productdetail.get"
    ? {
        method: T;
        params: Affiliate_Product_Details_Params;
        result: Affiliate_Product_Details_Result;
      }
    : T extends "aliexpress.affiliate.product.query"
    ? {
        method: T;
        params: Affiliate_Products_Params;
        result: Affiliate_Products_Result;
      }
    : T extends "aliexpress.affiliate.product.smartmatch"
    ? {
        method: T;
        params: Affiliate_Smart_Match_Products_Params;
        result: Affiliate_Smart_Match_Products_Result;
      }
    : {
        method: T;
        params: Record<string, string | number | boolean>;
        result: unknown;
      };

export type AE_Platform_Type = "TMALL" | "ALL" | "PLAZA";

export type AE_Language =
  | "EN"
  | "RU"
  | "PT"
  | "ES"
  | "FR"
  | "ID"
  | "IT"
  | "TH"
  | "JA"
  | "AR"
  | "VI"
  | "TR"
  | "DE"
  | "HE"
  | "KO"
  | "NL"
  | "PL"
  | "MX"
  | "CL"
  | "IW"
  | "IN";

export type AE_Currency =
  | "USD"
  | "GBP"
  | "CAD"
  | "EUR"
  | "CNY"
  | "UAH"
  | "MXN"
  | "TRY"
  | "RUB"
  | "BRL"
  | "AUD"
  | "INR"
  | "JPY"
  | "IDR"
  | "SEK"
  | "KRW";

export type AE_Locale_Site = "global" | "it_site" | "es_site" | "ru_site";

export type AE_Sort_Filter =
  | "SALE_PRICE_ASC"
  | "SALE_PRICE_DESC"
  | "LAST_VOLUME_ASC"
  | "LAST_VOLUME_DESC";

export type AE_Sort_Promo_Filter =
  | "commissionAsc"
  | "commissionDesc"
  | "priceAsc"
  | "priceDesc"
  | "volumeAsc"
  | "volumeDesc"
  | "discountAsc"
  | "discountDesc"
  | "ratingAsc"
  | "ratingDesc"
  | "promotionTimeAsc"
  | "promotionTimeDesc";

export type AE_Order_Status =
  | "PLACE_ORDER_SUCCESS"
  | "WAIT_BUYER_ACCEPT_GOODS"
  | "FUND_PROCESSING"
  | "FINISH";

export type AE_Logistics_Status =
  | "NO_LOGISTICS"
  | "WAIT_SELLER_SEND_GOODS"
  | "SELLER_SEND_GOODS"
  | "BUYER_ACCEPT_GOODS";

export type YES_NO = "Y" | "N";
