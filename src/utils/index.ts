import type { Affiliate_Base_Products_Cursor } from "../types";

export function parse_affiliate_products(
  input: Affiliate_Base_Products_Cursor,
) {
  if (!input?.products) return input;

  if ('product' in input.products) {
    input.products = (input.products as any).product;
  }

  const hasStringImageUrls = input.products?.[0]?.product_small_image_urls &&
    'string' in (input.products[0].product_small_image_urls as any);

  if (hasStringImageUrls) {
    input.products = input.products!.map((product) => ({
      ...product,
      product_small_image_urls: (product.product_small_image_urls as any).string
    }));
  }

  return input;
};

export function convert_data_uri_to_binary(data_uri: string) {
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

export async function $try<T>(
  promise: Promise<T>,
): Promise<[Error | undefined, T | undefined]> {
  try {
    const data = await promise;
    return [undefined, data];
  } catch (error) {
    return [assertIsError(error), undefined];
  }
}

export function assertIsError(value: unknown): Error {
  if (value instanceof Error) return value;

  let stringified = "[Unable to stringify the thrown value]";
  try {
    stringified = JSON.stringify(value);
  } catch { }

  const error = new Error(
    `This value was thrown as is, not through an Error: ${stringified}`,
  );
  return error;
}
