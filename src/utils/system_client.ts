import {
  AE_Base_Client,
  AES_Generate_Security_Token_Params,
  AES_Generate_Token_Params,
  AES_Refresh_Security_Token_Params,
  AES_Refresh_Token_Params,
} from "../types";
import { AEBaseClient } from "./client";

export class AESystemClient extends AEBaseClient {
  constructor(init: AE_Base_Client) {
    super(init);
  }

  /**
   *
   * @link https://open.aliexpress.com/doc/api.htm#/api?cid=3&path=/auth/token/security/create&methodType=GET/POST
   *
   */
  async generateSecurityToken(args: AES_Generate_Security_Token_Params) {
    return await this.execute("/auth/token/security/create", args);
  }

  /**
   *
   * @link https://open.aliexpress.com/doc/api.htm#/api?cid=3&path=/auth/token/create&methodType=GET/POST
   *
   */
  async generateToken(args: AES_Generate_Token_Params) {
    return await this.execute("/auth/token/create", args);
  }

  /**
   *
   * @link https://open.aliexpress.com/doc/api.htm#/api?cid=3&path=/auth/token/security/refresh&methodType=GET/POST
   *
   */
  async refreshSecurityToken(args: AES_Refresh_Security_Token_Params) {
    return await this.execute("/auth/token/security/refresh", args);
  }

  /**
   *
   * @link https://open.aliexpress.com/doc/api.htm#/api?cid=3&path=/auth/token/refresh&methodType=GET/POST
   *
   */
  async refreshToken(args: AES_Refresh_Token_Params) {
    return await this.execute("/auth/token/refresh", args);
  }
}
