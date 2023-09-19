import { Affiliate_Products_Response } from "../types";

export const parse_affiliate_products = (data: Affiliate_Products_Response) => {
  if ((data.resp_result.result.products as any).product)
    data.resp_result.result.products = (
      data.resp_result.result.products as any
    ).product;

  if (
    (data.resp_result.result.products[0]?.product_small_image_urls as any)
      .string
  )
    data.resp_result.result.products = data.resp_result.result.products.map(
      (product) => {
        product.product_small_image_urls = (
          product.product_small_image_urls as any
        ).string;
        return product;
      },
    );

  return data;
};
