# AliExpress SDK ![npm version](https://img.shields.io/npm/v/ae_sdk?label=)

![Typescript](https://img.shields.io/badge/-TypeScript-007ACC?style=flat-square&logo=typescript&logoColor=white)
![CI](https://img.shields.io/github/actions/workflow/status/moh3a/ae_sdk/main.yml?logo=githubactions&logoColor=white&label=CI)
![Publish](https://img.shields.io/github/actions/workflow/status/moh3a/ae_sdk/publish.yml?logo=githubactions&logoColor=white&label=Publish)
[![Downloads](https://img.shields.io/npm/dw/ae_sdk?logo=npm)](https://www.npmjs.com/package/ae_sdk)
[![Bundle Size](https://img.shields.io/bundlephobia/minzip/ae_sdk?label=size&logo=npm)](https://bundlephobia.com/package/ae_sdk)
[![License](https://img.shields.io/github/license/moh3a/ae_sdk)](https://github.com/moh3a/ae_sdk/blob/master/LICENSE)

A simple, lightweight, and fully type-safe SDK for the AliExpress Open Platform APIs. Supports System Authentication, Dropshipping, and Affiliate APIs.

## 📖 Overview

AliExpress has completely migrated their services from the legacy [Taobao Open Platform](https://developers.aliexpress.com) to the new [Open Platform for International Developers](https://openservice.aliexpress.com). While this update brought significant improvements, [they have yet to release an official Node.js SDK](https://openservice.aliexpress.com/doc/doc.htm?nodeId=27493&docId=118729#/?docId=1371) for the new platform.

This unofficial SDK bridges that gap by providing a simple, consistent interface for Node.js developers to interact with AliExpress APIs.

## ✨ Features

This SDK provides several key capabilities:

### 🔐 Authentication & Security

- **Request Signing** - Automatic generation of method signatures required by AliExpress
- **Session Management** - Streamlined token generation and refresh flows
- **Error Handling** - Consistent error responses with detailed messages

### 💻 Developer Experience

- **Type Safety** - Fully typed parameters and responses for all API methods
- **Intuitive API** - Clean, method-based approach to API calls

### 🛍️ Supported APIs

- **System Authentication** - Token generation, refresh, and security token operations
- **Dropshipping API** - Product details, order management, shipping calculations, and more
- **Affiliate API** - Product discovery, link generation, commission tracking, and reporting

## 📦 Installation

```sh
# Using npm
npm install ae_sdk

# Using pnpm
pnpm add ae_sdk

# Using yarn
yarn add ae_sdk
```

## 🚀 Getting Started

### Prerequisites

Before using this SDK, you'll need to complete several steps on the AliExpress Open Platform:

1. **Register as a Developer**

   - Create or use an existing AliExpress account
   - Register as a developer at [AliExpress Open Platform](https://openservice.aliexpress.com/)
   - [Detailed registration guide](https://openservice.aliexpress.com/doc/doc.htm?nodeId=27493&docId=118729#/?docId=1362)

2. **Create an Application**

   - Register a new application on the platform
   - [Application registration guide](https://openservice.aliexpress.com/doc/doc.htm?nodeId=27493&docId=118729#/?docId=1361)

3. **Get API Credentials**

   - Retrieve your `app_key` and `app_secret` from your registered application
   - [Credential retrieval guide](https://openservice.aliexpress.com/doc/doc.htm?nodeId=27493&docId=118729#/?docId=1360)

4. **Obtain Access Token**
   - Guide users through the authorization flow to get an access token
   - [Authorization flow guide](https://openservice.aliexpress.com/doc/doc.htm?nodeId=27493&docId=118729#/?docId=1364)

### Basic Usage

#### 1. Initialize a Client

Choose the appropriate client based on your needs (System, Dropshipper, or Affiliate):

```typescript
import { DropshipperClient } from "ae_sdk";

const client = new DropshipperClient({
  app_key: "YOUR_APP_KEY",
  app_secret: "YOUR_APP_SECRET",
  session: "ACCESS_TOKEN_FROM_AUTH_FLOW",
});
```

#### 2. Make API Calls

Each client provides typed methods for different API operations:

```typescript
// Get product details
const productResponse = await client.productDetails({
  product_id: 1005004043442825,
  ship_to_country: "US",
  target_currency: "USD",
  target_language: "en",
});

if (productResponse.ok) {
  console.log("Product:", productResponse.data);
}
```

#### 3. Handle Responses

All API methods return a consistent response structure:

```typescript
// Successful response
{
  ok: true,
  data: {
    // API-specific response data
    aliexpress_ds_product_get_response: {
      result: { /* product data */ },
      rsp_code: 200,
      rsp_msg: "Call succeeds",
      request_id: "1234567890"
    }
  }
}

// Error response
{
  ok: false,
  message: "Error message explaining what went wrong",
  request_id: "1234567890", // If available
  error_response: {}, // Full AliExpress error response if available
  error: {} // JavaScript Error object if applicable
}
```

## 📚 API Examples

### System Client

For authentication and token management:

```typescript
import { AESystemClient } from "ae_sdk";

const systemClient = new AESystemClient({
  app_key: "YOUR_APP_KEY",
  app_secret: "YOUR_APP_SECRET",
  session: "EXISTING_ACCESS_TOKEN", // Optional for some operations
});

// Generate a new token from an authorization code
const tokenResponse = await systemClient.generateToken({
  code: "AUTH_CODE_FROM_REDIRECT",
  uuid: "OPTIONAL_UUID",
});

// Refresh an existing token before it expires
const refreshResponse = await systemClient.refreshToken({
  refresh_token: "REFRESH_TOKEN_FROM_PREVIOUS_AUTH",
});
```

### Affiliate Client

For affiliate marketing operations:

```typescript
import { AffiliateClient } from "ae_sdk";

const affiliateClient = new AffiliateClient({
  app_key: "YOUR_APP_KEY",
  app_secret: "YOUR_APP_SECRET",
  session: "ACCESS_TOKEN",
});

// Generate affiliate tracking links
const linksResponse = await affiliateClient.generateAffiliateLinks({
  promotion_link_type: 0, // 0 for normal, 2 for hot product link
  source_values: "https://www.aliexpress.com/item/1234567890.html",
  tracking_id: "YOUR_TRACKING_ID",
  app_signature: "YOUR_APP_SIGNATURE",
});

// Find trending products with high commission rates
const hotProductsResponse = await affiliateClient.getHotProducts({
  app_signature: "YOUR_APP_SIGNATURE",
  keywords: "smartphone",
  page_no: 1,
  page_size: 20,
  platform_product_type: "ALL",
  ship_to_country: "US",
  sort: "SALE_PRICE_ASC",
  target_currency: "USD",
  target_language: "EN",
  tracking_id: "YOUR_TRACKING_ID",
});
```

### Dropshipper Client

For dropshipping operations:

```typescript
import { DropshipperClient } from "ae_sdk";

const dropshipperClient = new DropshipperClient({
  app_key: "YOUR_APP_KEY",
  app_secret: "YOUR_APP_SECRET",
  session: "ACCESS_TOKEN",
});

// Calculate shipping options and costs
const shippingResponse = await dropshipperClient.shippingInfo({
  country_code: "US",
  product_id: 1005004043442825,
  product_num: 2,
  province_code: "CA",
  city_code: "Los Angeles",
  send_goods_country_code: "CN",
  price: "29.99",
});

// Create a dropshipping order
const orderResponse = await dropshipperClient.createOrder({
  logistics_address: {
    address: "123 Main Street",
    city: "Los Angeles",
    country: "US",
    full_name: "John Doe",
    mobile_no: "123-456-7890",
    phone_country: "+1",
    province: "California",
    zip: "90001",
  },
  product_items: [
    {
      logistics_service_name: "AliExpress Standard Shipping",
      order_memo: "Customer order #12345",
      product_count: 2,
      product_id: 1005004043442825,
      sku_attr: "14:350853#Black;5:361386", // SKU specification attributes
    },
  ],
});
```

## 🔍 Advanced Usage

### Direct API Calls

For APIs not yet included in the SDK:

```typescript
const response = await client.callAPIDirectly(
  "aliexpress.custom.api.endpoint",
  {
    param1: "value1",
    param2: "value2",
    // Additional parameters as required by the API
  },
);
```

## 🤝 Contributing

Contributions are welcome! Feel free to open issues or submit pull requests for:

- Bug fixes
- New API endpoint support
- Documentation improvements
- Performance optimizations

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](https://github.com/moh3a/ae_sdk/blob/master/LICENSE) file for details.
