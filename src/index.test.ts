import { describe, expect, it } from "vitest";
import { ds_client, affiliate_client } from "./playground";

describe("Initialize a client", () => {
  it("Should initialize a dropshipper client", () => {
    expect(ds_client).toHaveProperty("createOrder");
  });

  it("Should initialize an affiliate client", () => {
    expect(affiliate_client).toHaveProperty("queryProducts");
  });
});

// describe("Type safety from API response", () => {
//   it("Should have a Result type from the dropshipper client", async () => {
//     // @ts-ignore - Should throw type error for invalid parameters
//     assertType<Result<DS_Place_Order_Result>>(
//       // @ts-expect-error
//       ds_client.createOrder({ logistics_address: {}, product_items: {} }),
//     );
//   });

//   it("Should have a Result type from the affiliate client", async () => {
//     // @ts-ignore - Should throw type error for invalid parameters
//     assertType<Result<Affiliate_Product_Details_Result>>(
//       affiliate_client.productDetails({ product_ids: "123" }),
//     );
//   });

//   it("Should throw error for an undefined return", async () => {
//     // @ts-ignore - Should throw type error for invalid parameters
//     expectTypeOf(ds_client.getCategories({})).not.toBeUndefined();
//   });
// });
