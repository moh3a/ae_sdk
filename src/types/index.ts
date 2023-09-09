export type Timestamp = string | number | Date;

export interface AENOProductItem {
  logistics_service_name?: string;
  order_memo?: string;
  product_count: number;
  product_id: number;
  sku_attr?: string;
}

export interface AENOLogisticsAddress {
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
