import {
  AE_Base_Client,
  AES_Generate_Security_Token_Params,
  AES_Generate_Security_Token_Result,
  AES_Generate_Token_Params,
  AES_Generate_Token_Result,
  AES_Refresh_Security_Token_Params,
  AES_Refresh_Security_Token_Result,
  AES_Refresh_Token_Params,
  AES_Refresh_Token_Result,
} from "../types";
import { AEBaseClient } from "./client";

export class AESystemClient extends AEBaseClient {
  constructor(init: AE_Base_Client) {
    super(init);
  }

  async generateSecurityToken(
    args: AES_Generate_Security_Token_Params,
  ): Promise<AES_Generate_Security_Token_Result | undefined> {
    return await this.execute("/auth/token/security/create", args);
  }

  async generateToken(
    args: AES_Generate_Token_Params,
  ): Promise<AES_Generate_Token_Result | undefined> {
    return await this.execute("/auth/token/create", args);
  }

  async refreshSecurityToken(
    args: AES_Refresh_Security_Token_Params,
  ): Promise<AES_Refresh_Security_Token_Result | undefined> {
    return await this.execute("/auth/token/security/refresh", args);
  }

  async refreshToken(
    args: AES_Refresh_Token_Params,
  ): Promise<AES_Refresh_Token_Result | undefined> {
    return await this.execute("/auth/token/refresh", args);
  }
}
