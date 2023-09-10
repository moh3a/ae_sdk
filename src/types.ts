/**
 * ALIEXPRESS SERVICES
 */

export type AE_DROPSHIPPING_SERVICE = "ds";
export type AE_AFFILIATE_SERVICE = "affiliate";
export type AE_SYSTEM_SERVICE = "system";
export type AE_SERVICE =
  | AE_AFFILIATE_SERVICE
  | AE_DROPSHIPPING_SERVICE
  | AE_SYSTEM_SERVICE;

/**
 * ALIEXPRESS API NAMES
 */

export type AE_API_NAMES =
  | DS_API_NAMES
  | AFFILIATE_API_NAMES
  | SYSTEM_API_NAMES;

export type DS_API_NAMES =
  | "aliexpress.ds.recommend.feed.get"
  | "aliexpress.ds.product.get"
  | "aliexpress.postproduct.redefining.findaeproductbyidfordropshipper"
  | "aliexpress.trade.buy.placeorder"
  | "aliexpress.ds.trade.order.get"
  | "aliexpress.logistics.buyer.freight.calculate"
  | "aliexpress.logistics.ds.trackinginfo.query";

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

export type AE_EXECUTE_FN_METHODS<T extends AE_SERVICE> =
  T extends AE_DROPSHIPPING_SERVICE
    ? DS_API_NAMES
    : T extends AE_SYSTEM_SERVICE
    ? SYSTEM_API_NAMES
    : AFFILIATE_API_NAMES;

/**
 * METHODS PARAMETERS
 */

export type AE_SYSTEM_EXECUTE_FN_PARAMS<T extends SYSTEM_API_NAMES> =
  T extends "/auth/token/security/create"
    ? AES_Generate_Security_Token_Params
    : T extends "/auth/token/create"
    ? AES_Generate_Token_Params
    : T extends "/auth/token/security/refresh"
    ? AES_Refresh_Security_Token_Params
    : T extends "/auth/token/refresh"
    ? AES_Refresh_Token_Params
    : unknown;

export type AE_DS_EXECUTE_FN_PARAMS<T extends DS_API_NAMES> =
  T extends "aliexpress.ds.recommend.feed.get"
    ? DS_ProductAPI_Recommended_Products_Params
    : T extends "aliexpress.ds.product.get"
    ? DS_ProductAPI_Product_Params
    : T extends "aliexpress.postproduct.redefining.findaeproductbyidfordropshipper"
    ? DS_ProductAPI_Product_Detail_Params
    : T extends "aliexpress.trade.buy.placeorder"
    ? DS_OrderAPI_Place_Order_Params
    : T extends "aliexpress.ds.trade.order.get"
    ? DS_OrderAPI_Get_Order_Params
    : T extends "aliexpress.logistics.buyer.freight.calculate"
    ? DS_ShippingAPI_Shipping_Info_Params
    : T extends "aliexpress.logistics.ds.trackinginfo.query"
    ? DS_ShippingAPI_Tracking_Info_Params
    : unknown;

export type AE_AFFILIATE_EXECUTE_FN_PARAMS<T extends AFFILIATE_API_NAMES> =
  T extends "aliexpress.affiliate.link.generate"
    ? Affiliate_Generate_Affiliate_Links_Params
    : T extends "aliexpress.affiliate.category.get"
    ? Affiliate_Categories_Params
    : T extends "aliexpress.affiliate.featuredpromo.get"
    ? Affiliate_Featuredpromo_Info_Params
    : T extends "aliexpress.affiliate.featuredpromo.products.get"
    ? Affiliate_Featured_Promo_Products_Params
    : T extends "aliexpress.affiliate.hotproduct.download"
    ? Affiliate_Hotproducts_Download_Params
    : T extends "aliexpress.affiliate.hotproduct.query"
    ? Affiliate_Hotproducts_Params
    : T extends "aliexpress.affiliate.order.get"
    ? Affiliate_Order_Info_Params
    : T extends "aliexpress.affiliate.order.list"
    ? Affiliate_Order_List_Params
    : T extends "aliexpress.affiliate.order.listbyindex"
    ? Affiliate_Order_List_ByIdx_Params
    : T extends "aliexpress.affiliate.productdetail.get"
    ? Affiliate_Product_Details_Params
    : T extends "aliexpress.affiliate.product.query"
    ? Affiliate_Products_Params
    : T extends "aliexpress.affiliate.product.smartmatch"
    ? Affiliate_Smart_Match_Products_Params
    : unknown;

export type AE_EXECUTE_FN_PARAMS<T extends AE_API_NAMES> =
  T extends DS_API_NAMES
    ? AE_DS_EXECUTE_FN_PARAMS<T>
    : T extends AFFILIATE_API_NAMES
    ? AE_AFFILIATE_EXECUTE_FN_PARAMS<T>
    : T extends SYSTEM_API_NAMES
    ? AE_SYSTEM_EXECUTE_FN_PARAMS<T>
    : unknown;

/**
 * METHODS RESULTS
 */

export type AE_SYSTEM_EXECUTE_FN_RESULT<T extends SYSTEM_API_NAMES> =
  T extends "/auth/token/security/create"
    ? AES_Generate_Security_Token_Result
    : T extends "/auth/token/create"
    ? AES_Generate_Token_Result
    : T extends "/auth/token/security/refresh"
    ? AES_Refresh_Security_Token_Result
    : T extends "/auth/token/refresh"
    ? AES_Refresh_Token_Result
    : unknown;

export type AE_DS_EXECUTE_FN_RESULT<T extends DS_API_NAMES> =
  T extends "aliexpress.ds.recommend.feed.get"
    ? DS_ProductAPI_Recommended_Products_Result
    : T extends "aliexpress.ds.product.get"
    ? DS_ProductAPI_Product_Result
    : T extends "aliexpress.postproduct.redefining.findaeproductbyidfordropshipper"
    ? DS_ProductAPI_Product_Detail_Result
    : T extends "aliexpress.trade.buy.placeorder"
    ? DS_OrderAPI_Place_Order_Result
    : T extends "aliexpress.ds.trade.order.get"
    ? DS_OrderAPI_Get_Order_Result
    : T extends "aliexpress.logistics.buyer.freight.calculate"
    ? DS_ShippingAPI_Shipping_Info_Result
    : T extends "aliexpress.logistics.ds.trackinginfo.query"
    ? DS_ShippingAPI_Tracking_Info_Result
    : unknown;

export type AE_AFFILIATE_EXECUTE_FN_RESULT<T extends AFFILIATE_API_NAMES> =
  T extends "aliexpress.affiliate.link.generate"
    ? Affiliate_Generate_Affiliate_Links_Result
    : T extends "aliexpress.affiliate.category.get"
    ? Affiliate_Categories_Result
    : T extends "aliexpress.affiliate.featuredpromo.get"
    ? Affiliate_Featuredpromo_Info_Result
    : T extends "aliexpress.affiliate.featuredpromo.products.get"
    ? Affiliate_Featured_Promo_Products_Result
    : T extends "aliexpress.affiliate.hotproduct.download"
    ? Affiliate_Hotproducts_Download_Result
    : T extends "aliexpress.affiliate.hotproduct.query"
    ? Affiliate_Hotproducts_Result
    : T extends "aliexpress.affiliate.order.get"
    ? Affiliate_Order_Info_Result
    : T extends "aliexpress.affiliate.order.list"
    ? Affiliate_Order_List_Result
    : T extends "aliexpress.affiliate.order.listbyindex"
    ? Affiliate_Order_List_ByIdx_Result
    : T extends "aliexpress.affiliate.productdetail.get"
    ? Affiliate_Product_Details_Result
    : T extends "aliexpress.affiliate.product.query"
    ? Affiliate_Products_Result
    : T extends "aliexpress.affiliate.product.smartmatch"
    ? Affiliate_Smart_Match_Products_Result
    : unknown;

export type AE_EXECUTE_FN_RESULT<T extends AE_API_NAMES> =
  T extends DS_API_NAMES
    ? AE_DS_EXECUTE_FN_RESULT<T>
    : T extends AFFILIATE_API_NAMES
    ? AE_AFFILIATE_EXECUTE_FN_RESULT<T>
    : T extends SYSTEM_API_NAMES
    ? AE_SYSTEM_EXECUTE_FN_RESULT<T>
    : unknown;

/**
 * Public parameters
 * @description Public parameters need to be set for every Aliexpress API
 * @param {String} method Indicates the API name.
 * @param {String | undefined} app_key Indicates the AppKey allocated by the TOP to an application. An ISV can choose Open Platform Console > Application Management > Overview to check the AppKey and AppSecret of the formal environment.
 * @param {String} session Indicates the authorization granted by the TOP to an application after a user logs in and grants authorization successfully.
 * @param {String} timestamp Indicates the time stamp in the format of yyyy-MM-dd HH:mm:ss and in the time zone of GMT+8. For example, 2016-01-01 12:00:00. The Taobao API server allows a maximum time error of 10 minutes for a request from a client.
 * @param {String} format Indicates the response format. The default value is xml. The value can be set to xml or json.
 * @param {String} v Indicates the API protocol version. The value can be set to 2.0.
 * @param {Boolean} simplify Indicates whether the simplified JSON return format is used. This parameter is valid only if format is set to json. The default value is false.
 * @param {String} sign_method Indicates the signature digest algorithm. The value can be set to hmac or md5.
 * @param {String} sign Indicates the obtained signature of API input parameters.
 */
export interface PublicParams {
  app_key: string;
  session: string;
  // access_token: string;
  timestamp: number;
  sign_method: "hmac" | "md5" | "sha256";
  method: AE_API_NAMES;
  sign?: string;
  simplify?: boolean;
}

export interface AE_Base_Client {
  app_key: string;
  app_secret: string;
  session: string;
  // access_token: string;
  url?: string;
  format?: AE_Response_Format;
}

export interface AE_Error_Response {
  error_response: {
    type: string;
    code: string;
    msg: string;
    request_id: string;
  };
}

export type AE_Response_Format = "xml" | "json";

/**
 * SYSTEM SERVICES
 * GENERATE SECURITY TOKEN
 */
export interface AES_Base_Access_Token_Result {
  account_id: string;
  seller_id: string;
  user_id: string;
  sp: string;
  access_token: string;
  refresh_token: string;
  expires_in: number;
  expire_time: number;
  refresh_token_valid_time: number;
  refresh_expires_in: number;
  locale: string;
}

export interface AES_Access_Token_Result extends AES_Base_Access_Token_Result {
  havana_id: string;
  user_nick: string;
  account: string;
  account_platform: string;
}

export interface AES_Generate_Security_Token_Params {
  code: string;
  uuid?: string;
}

export interface AES_Generate_Security_Token_Result
  extends AES_Base_Access_Token_Result {}

/**
 * SYSTEM SERVICES
 * GENERATE ACCESS TOKEN
 */
export interface AES_Generate_Token_Params
  extends AES_Generate_Security_Token_Params {}

export interface AES_Generate_Token_Result extends AES_Access_Token_Result {}

/**
 * SYSTEM SERVICES
 * REFRESH SECURITY TOKEN
 */
export interface AES_Refresh_Security_Token_Params
  extends AES_Refresh_Token_Params {}

export interface AES_Refresh_Security_Token_Result
  extends AES_Access_Token_Result {}

/**
 * SYSTEM SERVICES
 * REFRESH ACCESS TOKEN
 */
export interface AES_Refresh_Token_Params {
  refresh_token: string;
}

export interface AES_Refresh_Token_Result extends AES_Access_Token_Result {}

/**
 *
 * PRODUCT API
 * RECOMMENDED PRODUCTS
 *
 */

/**
 * Parameters to get the recommended products information feed
 * @param {String} feed_name
 * @param {String} category_id Category ID, you can get category ID via "get category" API https://developers.aliexpress.com/en/doc.htm?docId=45801&docType=2
 * @param {Number} page_no Page number
 * @param {String} sort sort by：priceAsc，priceDesc，volumeAsc、volumeDesc, discountAsc, discountDesc, DSRratingAsc，DSRratingDesc,
 * @param {Number} page_size record count of each page, 1 - 50
 * @param {String} target_language target language:EN,RU,PT,ES,FR,ID,IT,TH,JA,AR,VI,TR,DE,HE,KO,NL,PL,MX,CL,IN
 * @param {String} target_currency target currency:USD, GBP, CAD, EUR, UAH, MXN, TRY, RUB, BRL, AUD, INR, JPY, IDR, SEK,KRW
 * @param {String} country screens the subject product library for the target country
 */
export interface DS_ProductAPI_Recommended_Products_Params {
  country?: string;
  target_currency?: "USD" | "EUR";
  target_language?: "EN" | "FR" | "AR";
  page_size?: string;
  page_no?: string;
  sort?:
    | "priceAsc"
    | "priceDesc"
    | "volumeAsc"
    | "volumeDesc"
    | "discountAsc"
    | "discountDesc"
    | "DSRratingAsc"
    | "DSRratingDesc";
  category_id?: string;
  feed_name: string;
}

export type AE_Platform_Type = "TMALL" | "ALL" | "PLAZA";

export interface DS_ProductAPI_Recommended_Product {
  lastest_volume: number;
  seller_id: number;
  target_sale_price: string;
  evaluate_rate: string;
  target_original_price: string;
  shop_id: number;
  second_level_category_name: string;
  first_level_category_id: number;
  product_video_url: string;
  product_id: number;
  sale_price: string;
  target_sale_price_currency: string;
  second_level_category_id: number;
  shop_url: string;
  product_detail_url: string;
  product_title: string;
  first_level_category_name: string;
  product_main_image_url: string;
  platform_product_type: AE_Platform_Type;
  target_original_price_currency: string;
  ship_to_days: string;
  sale_price_currency: string;
  original_price: string;
  original_price_currency: string;
  discount: string;
}

export interface DS_ProductAPI_Recommended_Products {
  total_record_count: number;
  current_record_count: number;
  is_finished: boolean;
  total_page_no: number;
  current_page_no: number;
  products: DS_ProductAPI_Recommended_Product[];
}

export interface DS_ProductAPI_Recommended_Products_Result {
  result: DS_ProductAPI_Recommended_Products;
  rsp_msg: string;
  rsp_code: string;
}

/**
 * PRODUCT API
 * DROPSHIPPER PRODUCT DETAILS
 */
export interface DS_ProductAPI_Product_Params {
  product_id: number;
  ship_to_country?: string;
  target_currency?: string;
  target_language?: string;
}

export interface DS_ProductAPI_Product_Base_Info {
  product_id: number;
  category_id: number;
  subject: string;
  currency_code: string;
  product_status_type: string;
  ws_display: string;
  ws_offline_date: string;
  gmt_create: string;
  gmt_modified: string;
  owner_member_seq_long: number;
  evaluation_count: string;
  avg_evaluation_rating: string;
  detail: string;
  mobile_detail: string;
}

export interface DS_ProductAPI_Product_Shipping_Info {
  delivery_time: number;
  ship_to_country: string;
}

export interface DS_ProductAPI_Product_Package_Info {
  package_type: boolean;
  package_length: number;
  package_height: number;
  package_width: number;
  gross_weight: string;
  base_unit?: number;
  product_unit?: number;
}

export interface DS_ProductAPI_Product_Store_Info {
  store_id: number;
  store_name: string;
  item_as_described_rating: string;
  communication_rating: string;
  shipping_speed_rating: string;
}

export interface DS_ProductAPI_Product_Id_Converter {
  main_product_id: number;
  sub_product_id: string;
}

export interface DS_ProductAPI_Product_Multimedia_Videos {
  ali_member_id: number;
  media_id: number;
  media_status: string;
  media_type: string;
  poster_url: string;
}

export interface DS_ProductAPI_Product_Multimedia {
  ae_video_dtos: DS_ProductAPI_Product_Multimedia_Videos[];
  image_urls: string;
}

export interface DS_ProductAPI_Product {
  ae_item_base_info_dto: DS_ProductAPI_Product_Base_Info;
  ae_item_sku_info_dtos: DS_ProductAPI_Product_SKU_Variation[];
  ae_multimedia_info_dto: DS_ProductAPI_Product_Multimedia;
  package_info_dto: DS_ProductAPI_Product_Package_Info;
  logistics_info_dto: DS_ProductAPI_Product_Shipping_Info;
  ae_item_properties: DS_ProductAPI_Product_Attributes[];
  ae_store_info: DS_ProductAPI_Product_Store_Info;
  product_id_converter_result: DS_ProductAPI_Product_Id_Converter;
}

export interface DS_ProductAPI_Product_Result {
  result: DS_ProductAPI_Product;
  rsp_msg: string;
  rsp_code: string;
}

/**
 *
 * PRODUCT API
 * PRODUCT DETAILS
 *
 */

/**
 * Product details
 * @param {String} ship_to_country Country
 * @param {Number} product_id Item ID
 * @param {String} target_currency Target currency
 * @param {String} target_language Target language
 */
export interface DS_ProductAPI_Product_Detail_Params {
  product_id: number;
  local_country?: string;
  local_language?: string;
}

export interface DS_ProductAPI_Product_SKU_Properties {
  sku_property_id: number;
  sku_property_value: string;
  sku_property_name: string;
  property_value_id: number;
  property_value_id_long: number;
  property_value_definition_name?: string;
  sku_image?: string;
}

export interface DS_ProductAPI_Product_SKU_Variation {
  sku_stock: boolean;
  sku_price: string;
  sku_code: string;
  ipm_sku_stock: number;
  id: string;
  currency_code: string;
  aeop_s_k_u_propertys: DS_ProductAPI_Product_SKU_Properties[];
  barcode: string;
  offer_sale_price: string;
  offer_bulk_sale_price: string;
  sku_bulk_order: number;
  sku_available_stock?: number;
  s_k_u_available_stock?: number;
}

export interface DS_ProductAPI_Product_Attributes {
  attr_name_id: number;
  attr_name: string;
  attr_value_id: number;
  attr_value: string;
  attr_value_unit?: string;
  attr_value_start?: string;
  attr_value_end?: string;
}

export interface DS_ProductAPI_Store_Info {
  communication_rating: string;
  item_as_descriped_rating: string;
  shipping_speed_rating: string;
  store_id: number;
  store_name: string;
}

export interface DS_ProductAPI_Product_Details {
  aeop_ae_product_s_k_us: DS_ProductAPI_Product_SKU_Variation[];
  detail: string;
  is_success: boolean;
  product_unit: number;
  ws_offline_date: string;
  ws_display: string;
  category_id: number;
  aeop_a_e_multimedia: {
    aeop_a_e_videos: {
      aeop_ae_video: [
        {
          poster_url: string;
          media_type: string;
          media_status: string;
          media_id: number;
          ali_member_id: number;
        },
      ];
    };
  };
  owner_member_id: string;
  product_status_type: string;
  aeop_ae_product_propertys: DS_ProductAPI_Product_Attributes[];
  gross_weight: string;
  delivery_time: number;
  ws_valid_num: number;
  gmt_modified: string;
  error_message: string;
  package_type: boolean;
  aeop_national_quote_configuration: {
    configuration_type: string;
    configuration_data: string;
  };
  subject: string;
  base_unit: number;
  package_length: number;
  mobile_detail: string;
  package_height: number;
  package_width: number;
  currency_code: string;
  gmt_create: string;
  image_u_r_ls: string;
  product_id: number;
  error_code: number;
  product_price: string;
  item_offer_site_sale_price: string;
  total_available_stock: number;
  store_info: DS_ProductAPI_Store_Info;
  evaluation_count: number;
  avg_evaluation_rating: string;
  order_count: number;
}

export interface DS_ProductAPI_Product_Detail_Result {
  result: DS_ProductAPI_Product_Details;
}

/**
 *
 * ORDER API
 * NEW ORDER
 *
 */

/**
 * Place order params
 * @link https://developers.aliexpress.com/en/doc.htm?docId=35446&docType=2
 *
 */
export interface DS_OrderAPI_Place_Order_Params {
  /**
   * logistics_address
   * @description Logistics address information
   * @param {String} address Address information
   * @param {String} city
   * @param {String} contact_person 	Contact
   * @param {String} country
   * @param {String} full_name Receiver's full name
   * @param {String} mobile_no telephone number
   * @param {String} phone_country Country code where the phone is located
   * @param {String} province
   * @param {String} zip 	Postal code
   *
   * product_items
   * @description Product attribute
   * @param {Number} product_count Number of Products
   * @param {Number} product_id Product id
   * @param {String} sku_attr Product sku
   * @param {String} logistics_service_name   Logistics service name
   * @param {String} order_memo   User Comments
   *
   * JSON.stringify the whole thing
   */
  param_place_order_request4_open_api_d_t_o: string;
}

export interface AE_Product_Item {
  logistics_service_name?: string;
  order_memo?: string;
  product_count: number;
  product_id: number;
  sku_attr?: string;
}

export interface AE_Logistics_Address {
  address: string;
  city?: string;
  contact_person?: string;
  country?: string;
  full_name?: string;
  mobile_no?: string;
  phone_country?: string;
  province?: string;
  zip?: string;
}

export interface DS_OrderAPI_Place_Order_Result {
  result: {
    error_code: string;
    error_msg: string;
    order_list: number[];
    is_success: boolean;
  };
}

/**
 *
 * ORDER API
 * GET ORDER
 *
 */

export interface DS_OrderAPI_Get_Order_Params {
  order_id: number;
}

export interface DS_OrderAPI_Price {
  amount: string;
  currency_code: string;
}

export interface DS_OrderAPI_Product_Info {
  product_id: number;
  product_price: DS_OrderAPI_Price;
  product_name: string;
  product_count: number;
}

export interface DS_OrderAPI_Logistics_Info {
  logistics_no: string;
  logistics_service: string;
}

export interface DS_OrderAPI_Store_Info {
  store_id: number;
  store_name: string;
  store_url: string;
}

export interface DS_OrderAPI_Get_Order {
  gmt_create: string;
  order_status:
    | "PLACE_ORDER_SUCCESS"
    | "WAIT_BUYER_ACCEPT_GOODS"
    | "FUND_PROCESSING"
    | "FINISH";
  logistics_status:
    | "NO_LOGISTICS"
    | "WAIT_SELLER_SEND_GOODS"
    | "SELLER_SEND_GOODS"
    | "BUYER_ACCEPT_GOODS";
  order_amount: DS_OrderAPI_Price;
  child_order_list: DS_OrderAPI_Product_Info[];
  logistics_info_list: DS_OrderAPI_Logistics_Info[];
  store_info: DS_OrderAPI_Store_Info;
}

export interface DS_OrderAPI_Get_Order_Result {
  result: DS_OrderAPI_Get_Order;
  rsp_msg: string;
  rsp_code: string;
}

/**
 *
 * SHIPPING API
 * SHIPPING INFO
 *
 */

export interface DS_ShippingAPI_Shipping_Info_Params {
  /**
   * Get the support logistics info of a product, provide for dropshipping develeopers.
   *
   * @param {String} product_id Product ID
   * @param {String} city_code City code
   * @param {String} country_code National code
   * @param {String} product_num Number of Products
   * @param {String} province_code Province code
   * @param {String} send_goods_country_code Shipping country code
   * @param {String} price price
   * @param {String} price_currency Commodity price currency
   *
   * Apply JSON.stringify to pass params
   */
  param_aeop_freight_calculate_for_buyer_d_t_o: string;
}

export interface DS_ShippingAPI_Freight_Info {
  amount: number;
  cent: number;
  currency_code: string;
}

export interface DS_ShippingAPI_Shipping_Details {
  error_code: number;
  estimated_delivery_time: string;
  freight: DS_ShippingAPI_Freight_Info;
  service_name: string;
}

export interface DS_ShippingAPI_Shipping_Info_Result {
  result: {
    aeop_freight_calculate_result_for_buyer_d_t_o_list: DS_ShippingAPI_Shipping_Details[];
    error_desc: string;
    success: boolean;
  };
}

/**
 *
 * SHIPPING API
 * TRACKING INFO
 *
 */

/**
 * Dropshipper query logistics tracking information
 *
 * @param {String} logistics_no Logistics tracking number
 * @param {String} origin Order origin to be queried. The origin of the AE order is “ESCROW”.
 * @param {String} out_ref 	Order ID to be queried by the user
 * @param {String} service_name Logistics service KEY
 * @param {String} to_area Countries for receiving goods, DZ
 */
export interface DS_ShippingAPI_Tracking_Info_Params {
  logistics_no: string;
  origin: string;
  out_ref: string;
  service_name: string;
  to_area: string;
}

export interface DS_ShippingAPI_Tracking_Event {
  event_desc: string;
  signed_name: string;
  status: string;
  address: string;
  event_date: string;
}

export interface DS_ShippingAPI_Tracking_Info_Result {
  details: {
    details: DS_ShippingAPI_Tracking_Event[];
  };
  official_website: string;
  error_desc: string;
  result_success: boolean;
}

/**
 * AFFILIATE API
 * GENERATE AFFILIATE LINKS
 */
export interface Affiliate_Generate_Affiliate_Links_Params {
  /** Promotion link type: 0 for normal link which has standard commission , and 2 for hot link which has hot product commission */
  promotion_link_type: number;
  source_values: string;
  tracking_id: string;
  app_signature?: string;
}

export interface Affiliate_Promo_Link {
  promotion_link: string;
  source_value: string;
}

export interface Affiliate_Generate_Affiliate_Links {
  total_result_count: number;
  tracking_id: string;
  promotion_links: Affiliate_Promo_Link[];
}

export interface Affiliate_Generate_Affiliate_Links_Result {
  resp_result: {
    resp_code?: number;
    resp_msg?: string;
    result: Affiliate_Generate_Affiliate_Links;
  };
}

/**
 * AFFILIATE API
 * PRODUCT DETAILS
 */

export interface Affiliate_Product_Promo_Code_Info {
  promo_code?: string;
  code_campaigntype?: string;
  code_value?: string;
  code_availabletime_start?: string;
  code_availabletime_end?: string;
  code_mini_spend?: string;
  code_quantity?: string;
  code_promotionurl?: string;
}

export interface Affiliate_Base_Product_Params {
  app_signature?: string;
  fields?: string;
  target_currency?: string;
  target_language?: string;
  tracking_id?: string;
}

export interface Affiliate_Base_Product_Details {
  app_sale_price?: string;
  app_sale_price_currency?: string;
  commission_rate?: string;
  discount?: string;
  evaluate_rate?: string;
  first_level_category_id?: number;
  first_level_category_name?: string;
  hot_product_commission_rate?: string;
  lastest_volume?: number;
  original_price?: string;
  original_price_currency?: string;
  platform_product_type?: AE_Platform_Type;
  product_detail_url?: string;
  product_id?: number;
  product_main_image_url?: string;
  product_small_image_urls?: {
    string: string[];
  };
  product_title?: string;
  product_video_url?: string;
  promotion_link?: string;
  promo_code_info: Affiliate_Product_Promo_Code_Info;
  relevant_market_commission_rate: string;
  sale_price: string;
  sale_price_currency: string;
  second_level_category_id: number;
  second_level_category_name: string;
  shop_id: number;
  shop_url: string;
  target_app_sale_price: string;
  target_original_price: string;
  target_sale_price: string;
  target_original_price_currency: string;
  target_sale_price_currency: string;
  target_app_sale_price_currency: string;
}

export interface Affiliate_Product_Details
  extends Affiliate_Base_Product_Details {
  ship_to_days?: string;
}

export interface Affiliate_Product_Details_Params
  extends Affiliate_Base_Product_Params {
  product_ids: string;
  country?: string;
}

export interface Affiliate_Product_Details {
  current_record_count: number;
  products: Affiliate_Product_Details[];
}

export interface Affiliate_Product_Details_Result {
  resp_result: {
    resp_code: number;
    resp_msg: string;
    result: Affiliate_Product_Details;
  };
}

/**
 * AFFILIATE API
 * QUERY PRODUCTS
 */

export interface Affiliate_Products_Params
  extends Affiliate_Base_Product_Params {
  category_ids?: string;
  keywords?: string;
  max_sale_price?: string;
  min_sale_price?: string;
  page_no?: string;
  page_size?: string;
  platform_product_type?: AE_Platform_Type;
  sort?:
    | "SALE_PRICE_ASC"
    | "SALE_PRICE_DESC"
    | "LAST_VOLUME_ASC"
    | "LAST_VOLUME_DESC";
  delivery_days?: string;
  ship_to_country?: string;
}

export interface Affiliate_Products {
  current_page_no: number;
  current_record_count: number;
  products: Affiliate_Product_Details[];
  total_page_no: number;
  total_record_count: number;
}

export interface Affiliate_Products_Result {
  resp_result: {
    resp_code: number;
    resp_msg: string;
    result: Affiliate_Hotproducts;
  };
}

/**
 * AFFILIATE API
 * HOTPRODUCTS
 */

export interface Affiliate_Hotproducts_Params
  extends Affiliate_Products_Params {}

export interface Affiliate_Hotproducts extends Affiliate_Products {}

export interface Affiliate_Hotproducts_Result
  extends Affiliate_Products_Result {}

/**
 * AFFILIATE API
 * CATEGORIES
 */
export interface Affiliate_Categories_Params {
  app_signature?: string;
}

export interface Affiliate_Category_Details {
  category_id: number;
  category_name: string;
  parent_category_id: number;
}

export interface Affiliate_Categories {
  categories: Affiliate_Category_Details[];
  total_result_count: number;
}

export interface Affiliate_Categories_Result {
  resp_result: {
    resp_code: number;
    resp_msg: string;
    result: Affiliate_Categories;
  };
}

/**
 * AFFILIATE API
 * FEATURED PROMO INFO
 */
export interface Affiliate_Featuredpromo_Info_Params
  extends Affiliate_Categories_Params {}

export interface Affiliate_Featuredpromo_Details {
  promo_desc: string;
  promo_name: string;
  product_num: number;
}

export interface Affiliate_Featuredpromo_Info {
  current_record_count: number;
  promos: Affiliate_Featuredpromo_Details;
}

export interface Affiliate_Featuredpromo_Info_Result {
  resp_code: number;
  resp_msg: string;
  result: Affiliate_Featuredpromo_Info;
}

/**
 * AFFILIATE API
 * FEATURED PROMO PRODUCTS
 */

export interface Affiliate_Featured_Promo_Products_Params
  extends Affiliate_Base_Product_Params {
  category_id?: string;
  page_no?: string;
  page_size?: string;
  promotion_end_time?: string;
  promotion_name?: string;
  promotion_start_time?: string;
  sort?:
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
  country?: string;
}

export interface Affiliate_Featured_Promo_Product
  extends Affiliate_Base_Product_Details {}

export interface Affiliate_Featured_Promo_Products_Result {
  resp_result: {
    resp_code: number;
    resp_msg: string;
    result: {
      current_page_no: number;
      current_record_count: number;
      total_page_no: number;
      total_record_count: number;
      is_finished: boolean;
      products: Affiliate_Featured_Promo_Product[];
    };
  };
}

/**
 * AFFILIATE API
 * GET ORDER INFO
 */
export interface Affiliate_Order_Info_Params {
  app_signature?: string;
  fields?: string;
  order_ids?: string;
}

export interface Affiliate_Order_Details {
  estimated_finished_commission: number;
  product_detail_url: string;
  estimated_paid_commission: number;
  product_count: number;
  order_number: number;
  is_hot_product: "Y" | "N";
  parent_order_number: number;
  product_main_image_url: string;
  order_status: string;
  settled_currency: string;
  category_id: number;
  product_id: number;
  order_type: string;
  tracking_id: string;
  created_time: string;
  finished_time: string;
  completed_settlement_time: string;
  paid_time: string;
  customer_parameters: string;
  is_new_buyer: "Y" | "N";
  ship_to_country: string;
  sub_order_id: number;
  product_title: string;
  incentive_commission_rate: string;
  new_buyer_bonus_commission: number;
  estimated_incentive_paid_commission: number;
  is_affiliate_product: "Y" | "N";
  paid_amount: number;
  effect_detail_status: string;
  estimated_incentive_finished_commission: number;
  commission_rate: string;
  finished_amount: number;
  order_id: number;
}

export interface Affiliate_Order_Info {
  current_record_count: number;
  orders: Affiliate_Order_Details[];
}

export interface Affiliate_Order_Info_Result {
  resp_result: {
    result: Affiliate_Order_Info;
    resp_code?: number;
    resp_msg?: string;
  };
}

/**
 * AFFILIATE API
 * GET ORDER LIST
 */
export interface Affiliate_Order_List_Params {
  /** The type of time you are querying: Payment Completed Time(The time of payment for the order), Buyer Confirmed Receipt Time(The time when the buyer confirms receipt) Completed Settlement Time(The time when commission is paid into Account Balance) */
  time_type?: string;
  /** API signature */
  app_signature?: string;
  /** End time, PST time */
  end_time: string;
  /** Respond parameter list. eg: commission_rate,sale_price */
  fields?: string;
  locale_site?: string;
  page_no?: number;
  page_size?: number;
  /** Start time, PST time */
  start_time: string;
  /** Order status: Payment Completed(Buyer paid successfully), Buyer Confirmed Receipt(This status only change when:Buyer confirms receipt and settlement task begins which is manually executed by our operation team), Completed Settlement(Orders have been verified and commission has been paid), Invalid(Orders will not be settled including buyer refunds, order risks, antispam/penalty appeal failed, antispam/penalty appeal overdue, order not settled being over 180 days apart from the Completed Payment Time (such as in abnormal state like dispute), etc.) */
  status: string;
}

export interface Affiliate_Order_List {
  total_page_no: number;
  total_record_count: number;
  current_page_no: number;
  current_record_count: number;
  orders: Affiliate_Order_Details[];
}

export interface Affiliate_Order_List_Result {
  resp_result: {
    result: Affiliate_Order_List;
    resp_code?: number;
    resp_msg?: string;
  };
}

/**
 * AFFILIATE API
 * GET ORDER LIST BY INDEX
 */
export interface Affiliate_Order_List_ByIdx_Params {
  /** The type of time you are querying: Payment Completed Time(The time of payment for the order), Buyer Confirmed Receipt Time(The time when the buyer confirms receipt) Completed Settlement Time(The time when commission is paid into Account Balance) */
  time_type?: string;
  /** API signature */
  app_signature?: string;
  /** End time, PST time */
  end_time: string;
  /** Respond parameter list. eg: commission_rate,sale_price */
  fields?: string;
  page_size?: number;
  /** Start time, PST time */
  start_time: string;
  /** Order status: Payment Completed(Buyer paid successfully), Buyer Confirmed Receipt(This status only change when:Buyer confirms receipt and settlement task begins which is manually executed by our operation team), Completed Settlement(Orders have been verified and commission has been paid), Invalid(Orders will not be settled including buyer refunds, order risks, antispam/penalty appeal failed, antispam/penalty appeal overdue, order not settled being over 180 days apart from the Completed Payment Time (such as in abnormal state like dispute), etc.) */
  status: string;
  /** Query index start value: if not passed, You can only check the first page */
  start_query_index_id?: string;
}

export interface Affiliate_Order_List_ByIdx {
  min_query_index_id: string;
  max_query_index_id: string;
  current_record_count: number;
  orders: Affiliate_Order_Details[];
}

export interface Affiliate_Order_List_ByIdx_Result {
  resp_result: {
    result: Affiliate_Order_List_ByIdx;
    resp_code?: number;
    resp_msg?: string;
  };
}

/**
 * AFFILIATE API
 * GET HOTPRODUCT DOWNLOAD
 */
export interface Affiliate_Hotproducts_Download_Params {
  /** API signature */
  app_signature?: string;
  /** Category ID, you can get category ID via "get category" API https://developers.aliexpress.com/en/doc.htm?docId=45801&docType=2 */
  category_id: string;
  /** Respond parameter list. eg: commission_rate,sale_price */
  fields?: string;
  /** Local site：global, it_site, es_site, ru_site */
  locale_site?: string;
  page_no?: number;
  page_size?: number;
  /** Target Currency:USD, GBP, CAD, EUR, UAH, MXN, TRY, RUB, BRL, AUD, INR, JPY, IDR, SEK,KRW,ILS,THB,CLP,VND */
  target_currency?: string;
  /** Target Language:EN,RU,PT,ES,FR,ID,IT,TH,JA,AR,VI,TR,DE,HE,KO,NL,PL,MX,CL,IN */
  target_language?: string;
  /** Your trackingID */
  tracking_id?: string;
  /**  The Ship to country. Filter products that can be sent to that country; Returns the price according to the country’s tax rate policy.*/
  country?: string;
}

export interface Affiliate_Hotproducts_Download {
  current_page_no: number;
  current_record_count: number;
  products: Affiliate_Base_Product_Details[];
}

export interface Affiliate_Hotproducts_Download_Result {
  resp_result: {
    result: Affiliate_Hotproducts_Download;
    resp_code?: number;
    resp_msg?: string;
  };
}

/**
 * AFFILIATE API
 * SMART MATCH PRODUCTS
 */
export interface Affiliate_Smart_Match_Products_Params {
  /** App information */
  app?: string;
  /** API signature */
  app_signature?: string;
  /** Device infomation */
  device?: string;
  /** adid or idfa, for more information please refer to https://support.google.com/admanager/answer/6238701 Can be null, if it is null, it can be recommended based on keywords or product ID */
  device_id: string;
  /** Respond parameter list, eg: commission_rate,sale_price */
  fields?: string;
  /** Recommend products by keywords. eg: mp3 */
  keywords?: string;
  /** Request page number */
  page_no?: number;
  /** Product ID, matching related products product ID */
  product_id?: string;
  /** site information */
  site?: string;
  /** Target Currency: USD, GBP, CAD, EUR, UAH, MXN, TRY, RUB, BRL, AUD, INR, JPY, IDR, SEK,KRW,ILS,THB,CLP,VND */
  target_currency?: string;
  /** Target Languages: EN,RU,PT,ES,FR,ID,IT,TH,JA,AR,VI,TR,DE,HE,KO,NL,PL,MX,CL,IN */
  target_language?: string;
  tracking_id?: string;
  /** user id */
  user?: string;
  /** The Ship to country. Filter products that can be sent to that country; Returns the price according to the country’s tax rate policy. */
  country?: string;
}

export interface Affiliate_Smart_Match_Products_Result
  extends Affiliate_Hotproducts_Download_Result {}
