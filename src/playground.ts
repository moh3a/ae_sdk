import { DropshipperClient } from "./utils/ds_client";
export const ds_client = new DropshipperClient({
  app_key: "123",
  app_secret: "123456",
  session: "oauth_access_token",
});

import { AffiliateClient } from "./utils/affiliate_client";
export const affiliate_client = new AffiliateClient({
  app_key: "123",
  app_secret: "123456",
  session: "oauth_access_token",
});
