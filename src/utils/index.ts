import { Affiliate_Base_Products_Cursor } from "../types";

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
