# Aliexpress SDK ![npm version](https://img.shields.io/npm/v/ae_sdk?label=)

## AE Affiliate Client

### Generate an affiliate link

In order to generate an affiliate link for Aliexpress products that are registered in the affiliate program.

```ts
await client.generateAffiliateLinks({
  // 0 for a normal link, 2 for hot link which has hot product commission
  promotion_link_type: 0 | 2,
  // original aliexpress product's link
  source_values: "...",
  tracking_id: "...",
  app_signature: "...",
});
```

### Query hot products

To search for high commission affiliate products.

```ts
await client.getHotProducts({
  app_signature: "...",
  keywords: "watch",
  page_no: 1,
  page_size: 50,
  platform_product_type: "ALL",
  ship_to_country: "US",
  sort: "SALE_PRICE_ASC",
  target_currency: "USD",
  target_language: "EN",
  tracking_id: "...",
});
```

## Dropshipper client

### Product shipping details

Get the shipping details for any product.

```ts
await client.freightInfo({
  country_code: "DZ",
  send_goods_country_code: "CN",
  product_id: 123456,
  product_num: 1,
});
```

### Create an order

In order to place an order.

```ts
await client.createOrder({
  logistics_address: {
    address: "...",
    city: "...",
    country: "DZ",
    full_name: "Bou Ben",
    mobile_no: "0555 66 77 88",
    phone_country: "+213",
    zip: "16000",
  },
  product_items: [
    {
      logistics_service_name: "...",
      order_memo: "This is a dropshipping order.",
      product_count: 1,
      product_id: 123,
      sku_attr: "...",
    },
  ],
});
```
