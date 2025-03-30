# ae_sdk

<<<<<<< HEAD
## 0.6.0

### Minor Changes

- Added support for promotional payments in order creation while deprecating several legacy API methods.

  ## [Version 0.6.0]

  ### Added

  - Added `promo_and_payment` parameter to `createOrder` method

  ### Deprecated

  - Marked `freightInfo`, `trackingInfo`, and other legacy methods as deprecated

  ### Fixed

  - Improved README
=======
## 0.5.3

### Patch Changes

- Made callAPIDirectly method generic
>>>>>>> 2d2cd0c080d410223b8055664b5abf1e5708a07b

## 0.5.2

### Patch Changes

- General bug fixes

## 0.5.1

### Patch Changes

- Rename $try to tryFn

## 0.5.0

### Minor Changes

- Add the entire AE error response to the returned object if available

## 0.4.17

### Patch Changes

- Normalize AE API's (`aliexpress.logistics.buyer.freight.get` endpoint) response for a product's freight info.

  ```ts
  await client.freightInfo({
    country_code: "DZ",
    send_goods_country_code: "CN",
    product_id: 123456,
    product_num: 1,
  });
  ```

## 0.4.16

### Patch Changes

- ## ae_sdk - Patch 0.4.16

  The Aliexpress Open Platform released a new method for dropshippers to calculate freight. Now added in the dropshipper client as `freightInfo`.

  ```ts
  const result = await client.freightInfo({
    country_code: "DZ",
    product_id: 123,
    product_num: 1,
    sku_id: "SKU#2:3",
  });
  ```

## 0.4.15

### Patch Changes

- Fix affiliate API endpoint (get feature promo) error

## 0.4.14

### Patch Changes

- ## Documentation

  - Write a simple documentation for basic usage

  ## Other

  - Refactor some code for aesthtics
  - Add initial unit tests

## 0.4.13

### Patch Changes

- Add shipping details parameter (tracking_available)

## 0.4.12

### Patch Changes

- - Ensure API returns predefined types for AE affiliate API.

## 0.4.11

### Patch Changes

- Fix API sign method bug to support the [new AE API signing format](https://openservice.aliexpress.com/doc/doc.htm?nodeId=27493&docId=118729#/?docId=1386)
- Ensure API returns predefined types for AE dropshipping API

## 0.4.10

### Patch Changes

- Ensure API returns predefined types #5

## 0.4.9

### Patch Changes

- Ensure API returns predefined types #4

## 0.4.8

### Patch Changes

- Ensure API returns predefined types #3

## 0.4.7

### Patch Changes

- Ensure API returns predefined types #2

## 0.4.6

### Patch Changes

- Ensure API returns predefined types

## 0.4.5

### Patch Changes

- Fix accessing product details response #2

## 0.4.4

### Patch Changes

- Fix accessing product details response

## 0.4.3

### Patch Changes

- Add newly registered APIs support

## 0.4.2

### Patch Changes

- Export some relevant types #2

## 0.4.1

### Patch Changes

- Export some relevant types

## 0.4.0

### Minor Changes

- Fix affiliate API return types

## 0.3.4

### Patch Changes

- Fix dropshipping methods result types

## 0.3.3

### Patch Changes

- Add dropshipping API methods

## 0.3.2

### Patch Changes

- Finish affiliate API methods

## 0.3.1

### Patch Changes

- Add affiliate API methods

## 0.3.0

### Minor Changes

- Add system tool API and fix method signature

## 0.2.0

### Minor Changes

- Migrate to new AE API and add affiliate methods

## 0.1.0

### Minor Changes

- Added AE clients

## 0.0.5

### Patch Changes

- Added initial README

## 0.0.4

### Patch Changes

- Add license and npm dist folder

## 0.0.3

### Patch Changes

- 6afa68d: Added publish github action workflow and added changeset
