import { Affiliate_Base_Product_Details } from "../types";

export const parse_affiliate_products = (
  input?: Affiliate_Base_Product_Details[],
) => {
  if (input && (input as any).product) input = (input as any).product;

  if ((input && (input[0]?.product_small_image_urls as any)).string) {
    input = input?.map((product) => {
      product.product_small_image_urls = (
        product.product_small_image_urls as any
      ).string;
      return product;
    });
  }

  return input;
};
