# AE_SDK

A simple and type-safe SDK for Aliexpress (system tools, dropshipping and affiliate) APIs.

## Disclamer

This library is currently under heavy development. More endpoints and documentation will be coming.

## Installation

```sh
# using npm
npm i ae_sdk

# using pnpm
pnpm add ae_sdk

# using yarn
yarn add ae_sdk
```

## Usage

```ts
// step 1: import the AE affiliate (`AffiliateClient`) or dropshipping (`DropshipperClient`) client
import { DropshipperClient /* AffiliateClient */ } from "ae_sdk";

// step 2: initilize the client
const client = new DropshipperClient({
  app_key: "123",
  app_secret: "123456abcdef", // https://open.aliexpress.com/doc/doc.htm?nodeId=27493&docId=118729#/?docId=732
  session: "oauth_access_token", // https://open.aliexpress.com/doc/doc.htm?nodeId=27493&docId=118729#/?docId=730
});

// step 3: you are all set !
const result = await client.productDetails({
  product_id: 1005004043442825,
  ship_to_country: "DZ",
  target_currency: "USD",
  target_language: "en",
});

console.log(result);
/* Console:
{
  ok: true,
  data: {
    aliexpress_ds_product_get_response: {
      result: {...},
      rsp_code: 200,
      rsp_msg: 'Call succeeds',
      request_id: "..."
    }
  }
}
*/
```

## Todo

- Add in code documentation using `jsdoc`;
- Fix method result types (affiliate)
- Add unit tests;
