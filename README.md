# Aliexpress SDK ![npm version](https://img.shields.io/npm/v/ae_sdk?label=)

![Typescript](https://img.shields.io/badge/-TypeScript-007ACC?style=flat-square&logo=typescript&logoColor=white)
![CI](https://img.shields.io/github/actions/workflow/status/moh3a/ae_sdk/main.yml?logo=githubactions&logoColor=white&label=CI)
![Publish](https://img.shields.io/github/actions/workflow/status/moh3a/ae_sdk/publish.yml?logo=githubactions&logoColor=white&label=Publish)
[![Downloads](https://img.shields.io/npm/dw/ae_sdk?logo=npm)](https://www.npmjs.com/package/ae_sdk)
[![Bundle Size](https://img.shields.io/bundlephobia/minzip/ae_sdk?label=size&logo=npm)](https://bundlephobia.com/package/ae_sdk)
[![License](https://img.shields.io/github/license/moh3a/ae_sdk)](https://github.com/moh3a/ae_sdk/blob/master/LICENSE)

A simple and type-safe SDK for Aliexpress (system tools, dropshipping and affiliate) APIs.

## Overview

Aliexpress launched a new open platform to consume their APIs. They fully migrated and upgraded their services from the old [Taobao Open Platform](https://developers.aliexpress.com) to the new [Open Platform for International Developers](https://openservice.aliexpress.com). The issue is, with this update, [they have yet to release a Node.js SDK](https://openservice.aliexpress.com/doc/doc.htm?nodeId=27493&docId=118729#/?docId=1371).

## Features

This library is an unofficial and **simple** SDK that can do the following:

- Compose a request, generate an encryption (method signature) and interprete the response.
- Pass the right parameters for your API call with type safe methods.
- Currently supports the **system tools for authentication**, **Affiliate API** and **Dropshipping API**.

## Installation

```sh
# using npm
npm i ae_sdk

# using pnpm
pnpm add ae_sdk

# using yarn
yarn add ae_sdk
```

## Prerequisites

Before you can start using this SDK you should start with the following steps:

### Become a developer

You must have an Aliexpress account or create one, and then register as a developer through [this link](https://openservice.aliexpress.com/).
[For more details](https://openservice.aliexpress.com/doc/doc.htm?nodeId=27493&docId=118729#/?docId=1362).

### Register an application

After creating your developer account, you can start registering a new applicationon by following the steps details in the [following link](https://openservice.aliexpress.com/doc/doc.htm?nodeId=27493&docId=118729#/?docId=1361).

### Retrieve App Key and App Secret

Once your application is registered, the `app_key` and `app_secret` are assigned to the application automatically. These parameters must be included in every AE API request.
For more details on how to retrieve them, [visit](https://openservice.aliexpress.com/doc/doc.htm?nodeId=27493&docId=118729#/?docId=1360).

### Retrieve the access token

In order to access Aliexpress sellers’ business data, the application needs to get the authorization from sellers, and you need to guide them to complete the flow of “using Aliexpress seller account to log in and authorize”.
Follow the steps detailed in [this link](https://openservice.aliexpress.com/doc/doc.htm?nodeId=27493&docId=118729#/?docId=1364) to get your access token. It must included in every AE API request.

## Usage

> Using the dropshipping client in this example

### Initialize a client

After retrieving the required parameters to initialize a new client, you do the following:

```ts
import { DropshipperClient } from "ae_sdk";

const client = new DropshipperClient({
  app_key: "123",
  app_secret: "123456abcdef",
  session: "oauth_access_token",
});
```

### Write your first AE API method

With your client initialized, you're all set up. For example, you can retrieve a certain product's details:

```ts
await client.productDetails({
  product_id: 1005004043442825,
  ship_to_country: "DZ",
  target_currency: "USD",
  target_language: "en",
});
```

### Your API response

All API calls, if successfull will return a boolen `ok` and a `data` with the response body.
The following is an example response for the above API request:

```json
{
  "ok": true,
  "data": {
    "aliexpress_ds_product_get_response": {
      "result": {},
      "rsp_code": 200,
      "rsp_msg": "Call succeeds",
      "request_id": "..."
    }
  }
}
```

If not successfull, you will get:

```jsonc
{
  "ok": false,
  "message": "...",
  "request_id": "...",
  "error_response": {} /** Entire AE API error response, if available */,
  "error": {} /** JS Error object, if available */
}
```

#### Directly call the API

If you wish to call a different Aliexpress API that is not available in the current version. You can do the following:

```ts
const result = await client.callAPIDirectly("aliexpress.api.endpoint", {
  [string]: string | number | boolean,
});
```

## Examples

### AE Affiliate Client

#### Generate an affiliate link

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

#### Query hot products

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

### Dropshipper client

#### Product shipping details

Get the shipping details for any product.

```ts
await client.freightInfo({
  country_code: "DZ",
  send_goods_country_code: "CN",
  product_id: 123456,
  product_num: 1,
});
```

#### Create an order

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
