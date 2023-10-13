import type { Affiliate_Base_Products_Cursor } from "../types";

export const parse_affiliate_products = (
  input: Affiliate_Base_Products_Cursor,
) => {
  if (input && input.products && (input.products as any).product)
    input.products = (input.products as any).product;

  if (
    (
      input &&
      input.products &&
      (input.products[0]?.product_small_image_urls as any)
    )?.string
  ) {
    input.products = input.products.map((product) => {
      product.product_small_image_urls = (
        product.product_small_image_urls as any
      ).string;
      return product;
    });
  }

  return input;
};

export const convert_data_uri_to_binary = (data_uri: string) => {
  const base64 = data_uri.substring(
    data_uri.indexOf(";base64,") + ";base64,".length,
  );
  const raw = atob(base64);
  const array = new Uint8Array(new ArrayBuffer(raw.length));

  for (let i = 0; i < raw.length; i++) {
    array[i] = raw.charCodeAt(i);
  }
  return array;
};
