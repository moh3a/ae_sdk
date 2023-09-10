# AE_SDK

A simple and type-safe SDK for Aliexpress (system tools, dropshipping and affiliate) APIs.

## Disclamer

This library is currently under heavy development. More endpoints and documentation will be coming.

## Installation

```sh
# using npm
npm i -D ae_sdk

# using pnpm
pnpm add -D ae_sdk

# using yarn
yarn add ae_sdk
```

## Usage

```ts
// step 1: import the AE affiliate (`AEAffiliateClient`) or dropshipping (`AEDSClient`) client
import { AEAffiliateClient /* AEDSClient */ } from "ae_sdk";

// step 2: initilize the client
const client = new AEAffiliateClient({
  app_key: "123",
  app_secret: "123456abcdef",
  session: "oauth_access_token",
});

// step 3: you are all set !
```

## Todo

- Update ds APIs according to [aliexpress official website](https://open.aliexpress.com/doc/api.htm#/api);
- Add better error handling and fix resp_result / error_result;
- Add in code documentation using `jsdoc`;
- Add unit tests;
