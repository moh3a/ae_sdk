import type { Affiliate_Base_Products_Cursor } from "../types";

export function parseAffiliateProducts(input: Affiliate_Base_Products_Cursor) {
  if (!input?.products) return input;

  input.products = extractNestedArray(input.products, "product");

  if (input.products?.length > 0) {
    const firstProduct = input.products[0];

    const hasStringImageUrls =
      firstProduct?.product_small_image_urls &&
      extractNestedProperty(firstProduct.product_small_image_urls, "string") !==
        null;

    if (hasStringImageUrls) {
      input.products = input.products.map((product) => ({
        ...product,
        product_small_image_urls: extractNestedArray(
          product.product_small_image_urls,
          "string",
        ),
      }));
    }
  }

  return input;
}

export function extractNestedProperty<T>(
  obj: any,
  nestedKey: string,
): T | null {
  if (!obj) return null;
  return nestedKey in obj ? obj[nestedKey] : null;
}

export function extractNestedArray<T>(obj: any, nestedKey: string): T[] {
  if (!obj) return [];

  if (nestedKey in obj && obj[nestedKey]) {
    if (Array.isArray(obj[nestedKey])) {
      return obj[nestedKey];
    }
    return [obj[nestedKey]].filter(Boolean);
  }

  return [];
}

export async function tryFn<T>(
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
  } catch {}

  const error = new Error(
    `This value was thrown as is, not through an Error: ${stringified}`,
  );
  return error;
}
