# Aliexpress SDK ![npm version](https://img.shields.io/npm/v/ae_sdk?label=)

> We use the dropshipping client in this example

## Initialize a client

After retrieving the required parameters to initialize a new client, you do the following:

```ts
import { DropshipperClient } from "ae_sdk";

const client = new DropshipperClient({
  app_key: "123",
  app_secret: "123456abcdef",
  session: "oauth_access_token",
});
```

## Write your first AE API method

With your client initialized, you're all set up. For example, you can retrieve a certain product's details:

```ts
await client.productDetails({
  product_id: 1005004043442825,
  ship_to_country: "DZ",
  target_currency: "USD",
  target_language: "en",
});
```

## Your API response

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

### Directly call the API

If you wish to call a different Aliexpress API that is not by the current version. You can do the following:

```ts
const result = await client.callAPIDirectly("aliexpress.api.endpoint", {
  [string]: string | number | boolean,
});
```
