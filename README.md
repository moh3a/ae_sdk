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

## Usage

To be able to use this SDK, you must first [become a developer](https://openservice.aliexpress.com/doc/doc.htm?nodeId=27493&docId=118729#/?docId=1362), follow the steps to register an application, to then retrive your `app_key` and `app_secret`.

Lastly an access token is required to access the API, follow the steps for the authorization process [described in this link](https://openservice.aliexpress.com/doc/doc.htm?nodeId=27493&docId=118729#/?docId=1364). When you get your access token, make sure to pass it the client initialization as `session`.

```ts
// step 1: import the AE affiliate (`AffiliateClient`) or dropshipping (`DropshipperClient`) client
import { DropshipperClient /* AffiliateClient */ } from "ae_sdk";

// step 2: initilize the client
const client = new DropshipperClient({
  app_key: "123",
  app_secret: "123456abcdef", // process.env.AE_DS_APP_SECRET
  session: "oauth_access_token", // process.env.AE_DS_ACCESS_TOKEN or fetch from DB
});

// step 3: you are all set !
const result = await client.productDetails({
  product_id: 1005004043442825,
  ship_to_country: "DZ",
  target_currency: "USD",
  target_language: "en",
});

console.log(result);
```

If the call was successfull, you will get back the following results.

> Inside the `data` object is the API response.

```text
{
  ok: true,
  data: {
    aliexpress_ds_product_get_response: {
      result: {...},
      rsp_code: 200,
      rsp_msg: "Call succeeds",
      request_id: "..."
    }
  }
}
```

Else if an error occured you will receive the following:

> Make sure you to pass the right parameters, but if the problem persits, please contact me

```text
{
  ok: false,
  message: "..."
}
```

### Directly call the API

If you wish to call a different Aliexpress API that is not by the current version. You can do the following:

```ts
const result = await client.callAPIDirectly("aliexpress.api.endpoint", {
  [string]: string | number | boolean,
});
```

## Todos

- Add file parameter to pass `bytes[]` as a method argument, example: query product using an image.
- Add unit tests.
- Write documentation.
