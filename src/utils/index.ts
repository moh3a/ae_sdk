import { Affiliate_Base_Products_Cursor_Response } from "../types";

export const parse_affiliate_products = <
  T extends Partial<Affiliate_Base_Products_Cursor_Response>,
>(
  input: T,
) => {
  let data = input.resp_result?.result.products;
  if (data && (data as any).product) data = (data as any).product;

  if ((data && (data[0]?.product_small_image_urls as any)).string) {
    data = data?.map((product) => {
      product.product_small_image_urls = (
        product.product_small_image_urls as any
      ).string;
      return product;
    });
  }

  return input;
};
