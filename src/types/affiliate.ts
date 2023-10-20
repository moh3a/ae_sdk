import type {
  AE_Currency,
  AE_Language,
  AE_Locale_Site,
  AE_Platform_Type,
  AE_Sort_Filter,
  AE_Sort_Promo_Filter,
  YES_NO,
} from ".";

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
  /** Respond parameter list. eg: commission_rate,sale_price */
  fields?: string;
  target_currency?: AE_Currency;
  target_language?: AE_Language;
  tracking_id?: string;
}

export interface Affiliate_Base_Product_Details {
  app_sale_price?: string;
  app_sale_price_currency?: AE_Currency;
  commission_rate?: string;
  discount?: string;
  evaluate_rate?: string;
  first_level_category_id?: number;
  first_level_category_name?: string;
  hot_product_commission_rate?: string;
  lastest_volume?: number;
  original_price?: string;
  original_price_currency?: AE_Currency;
  platform_product_type?: AE_Platform_Type;
  product_detail_url?: string;
  product_id?: number;
  product_main_image_url?: string;
  product_small_image_urls?: string[];
  product_title?: string;
  product_video_url?: string;
  promotion_link?: string;
  promo_code_info?: Affiliate_Product_Promo_Code_Info;
  relevant_market_commission_rate?: string;
  sale_price: string;
  sale_price_currency: AE_Currency;
  second_level_category_id: number;
  second_level_category_name: string;
  shop_id: number;
  shop_url: string;
  target_app_sale_price: string;
  target_original_price: string;
  target_sale_price: string;
  target_original_price_currency: AE_Currency;
  target_sale_price_currency: AE_Currency;
  target_app_sale_price_currency: AE_Currency;
  ship_to_days?: string;
}

export interface Affiliate_Base_Products_Cursor {
  products?: Affiliate_Base_Product_Details[];
  current_record_count?: number;
  current_page_no?: number;
  total_page_no?: number;
  total_record_count?: number;
  is_finished?: boolean;
}

export interface Affiliate_Base_Products_Cursor_Response {
  resp_result: {
    result: Affiliate_Base_Products_Cursor;
    resp_code?: number;
    resp_msg?: string;
  };
}

/**
 * AFFILIATE API
 * PRODUCT DETAILS
 */

export interface Affiliate_Product_Details_Params
  extends Affiliate_Base_Product_Params {
  product_ids: string;
  country?: string;
}

export interface Affiliate_Product_Details_Result {
  aliexpress_affiliate_productdetail_get_response: Affiliate_Base_Products_Cursor_Response;
}

/**
 * AFFILIATE API
 * QUERY PRODUCTS
 */

export interface Affiliate_Products_Params
  extends Affiliate_Base_Product_Params {
  /** List of category ID, you can get category ID via "get category" API https://developers.aliexpress.com/en/doc.htm?docId=45801&docType=2 */
  category_ids?: string;
  keywords?: string;
  /** Filter products by highest price, unit cent */
  max_sale_price?: string;
  /** Filter products by lowest price, unit cent */
  min_sale_price?: string;
  page_no?: string;
  /** record count of each page, 1 - 50 */
  page_size?: string;
  platform_product_type?: AE_Platform_Type;
  sort?: AE_Sort_Filter;
  /** Estimated delivery days. 3：in 3 days，5：in 5 days，7：in 7 days，10：in 10 days */
  delivery_days?: string;
  /** The Ship to country. Filter products that can be sent to that country; Returns the price according to the country’s tax rate policy. */
  ship_to_country?: string;
}

export interface Affiliate_Products_Result {
  aliexpress_affiliate_product_query_response: Affiliate_Base_Products_Cursor_Response;
}

/**
 * AFFILIATE API
 * HOTPRODUCTS
 */

export interface Affiliate_Hotproducts_Params
  extends Affiliate_Products_Params {}

export interface Affiliate_Hotproducts_Result {
  aliexpress_affiliate_hotproduct_query_response: Affiliate_Base_Products_Cursor_Response;
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
  sort?: AE_Sort_Promo_Filter;
  country?: string;
}

export interface Affiliate_Featured_Promo_Products_Result {
  aliexpress_affiliate_featuredpromo_products_get_response: Affiliate_Base_Products_Cursor_Response;
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
  locale_site?: AE_Locale_Site;
  page_no?: number;
  page_size?: number;
  /** Target Currency:USD, GBP, CAD, EUR, UAH, MXN, TRY, RUB, BRL, AUD, INR, JPY, IDR, SEK,KRW,ILS,THB,CLP,VND */
  target_currency?: AE_Currency;
  /** Target Language:EN,RU,PT,ES,FR,ID,IT,TH,JA,AR,VI,TR,DE,HE,KO,NL,PL,MX,CL,IN */
  target_language?: AE_Language;
  /** Your trackingID */
  tracking_id?: string;
  /**  The Ship to country. Filter products that can be sent to that country; Returns the price according to the country’s tax rate policy.*/
  country?: string;
}

export interface Affiliate_Hotproducts_Download_Result {
  aliexpress_affiliate_hotproduct_download_response: Affiliate_Base_Products_Cursor_Response;
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
  target_currency?: AE_Currency;
  /** Target Languages: EN,RU,PT,ES,FR,ID,IT,TH,JA,AR,VI,TR,DE,HE,KO,NL,PL,MX,CL,IN */
  target_language?: AE_Language;
  tracking_id?: string;
  /** user id */
  user?: string;
  /** The Ship to country. Filter products that can be sent to that country; Returns the price according to the country’s tax rate policy. */
  country?: string;
}

export interface Affiliate_Smart_Match_Products_Result {
  aliexpress_affiliate_product_smartmatch_response: Affiliate_Base_Products_Cursor_Response;
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
  aliexpress_affiliate_link_generate_response: {
    resp_result: {
      resp_code?: number;
      resp_msg?: string;
      result: Affiliate_Generate_Affiliate_Links;
    };
  };
}

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
  aliexpress_affiliate_category_get_response: {
    resp_result: {
      resp_code: number;
      resp_msg: string;
      result: Affiliate_Categories;
    };
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
  promos: Affiliate_Featuredpromo_Details[];
}

export interface Affiliate_Featuredpromo_Info_Response {
  resp_code?: number;
  resp_msg?: string;
  result: Affiliate_Featuredpromo_Info;
}

export interface Affiliate_Featuredpromo_Info_Result {
  aliexpress_affiliate_featuredpromo_get_response: {
    resp_result: Affiliate_Featuredpromo_Info_Response;
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
  is_hot_product: YES_NO;
  parent_order_number: number;
  product_main_image_url: string;
  order_status: string;
  settled_currency: AE_Currency;
  category_id: number;
  product_id: number;
  order_type: string;
  tracking_id: string;
  created_time: string;
  finished_time: string;
  completed_settlement_time: string;
  paid_time: string;
  customer_parameters: string;
  is_new_buyer: YES_NO;
  ship_to_country: string;
  sub_order_id: number;
  product_title: string;
  incentive_commission_rate: string;
  new_buyer_bonus_commission: number;
  estimated_incentive_paid_commission: number;
  is_affiliate_product: YES_NO;
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
  aliexpress_affiliate_order_get_response: {
    resp_result: {
      result: Affiliate_Order_Info;
      resp_code?: number;
      resp_msg?: string;
    };
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
  locale_site?: AE_Locale_Site;
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
  aliexpress_affiliate_order_list_response: {
    resp_result: {
      result: Affiliate_Order_List;
      resp_code?: number;
      resp_msg?: string;
    };
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
  aliexpress_affiliate_order_listbyindex_response: {
    resp_result: {
      result: Affiliate_Order_List_ByIdx;
      resp_code?: number;
      resp_msg?: string;
    };
  };
}
