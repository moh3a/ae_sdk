/**
 * @fileoverview
 * AliExpress System API Client implementation.
 * This file contains the client for interacting with AliExpress System API endpoints,
 * primarily focused on authentication token management.
 *
 * The AESystemClient extends the base client functionality to provide methods
 * for generating and refreshing both standard and security tokens required for
 * authenticated API access to AliExpress APIs.
 *
 * These authentication operations are fundamental to maintaining valid sessions
 * when working with any AliExpress API endpoints, and this client serves as a
 * foundation for more specialized clients like DropshipperClient and AffiliateClient.
 */

import type {
  AE_Base_Client,
  AES_Generate_Security_Token_Params,
  AES_Generate_Token_Params,
  AES_Refresh_Security_Token_Params,
  AES_Refresh_Token_Params,
} from "../types";
import { AEBaseClient } from "./client";

/**
 * Client for AliExpress System API operations.
 *
 * This client provides methods for token management and authentication with
 * the AliExpress API system. It extends the base client with specialized
 * methods for generating and refreshing access tokens, which are required
 * for authenticated access to other API endpoints.
 *
 * The client serves as a foundation for other specialized clients and can
 * be used directly for authentication operations.
 *
 * @extends AEBaseClient Base client with core API interaction capabilities
 */
export class AESystemClient extends AEBaseClient {
  constructor(init: AE_Base_Client) {
    super(init);
  }

  /**
   * Generates a new security token for enhanced API security.
   *
   * Creates a security token that provides an additional layer of authentication
   * for sensitive API operations. Security tokens typically have stricter validation
   * and shorter expiration times compared to standard tokens.
   *
   * @param args - Parameters required for security token generation
   * @returns API response with the generated security token and related information
   * @link https://open.aliexpress.com/doc/api.htm#/api?cid=3&path=/auth/token/security/create&methodType=GET/POST
   */
  async generateSecurityToken(args: AES_Generate_Security_Token_Params) {
    return await this.execute("/auth/token/security/create", args);
  }

  /**
   * Generates a standard authentication token for API access.
   *
   * Creates a regular access token that can be used for most API operations.
   * This is typically the first step in establishing an authenticated session
   * with the AliExpress API system.
   *
   * @param args - Parameters required for token generation, including auth code
   * @returns API response with the generated token and related information like expiration time
   * @link https://open.aliexpress.com/doc/api.htm#/api?cid=3&path=/auth/token/create&methodType=GET/POST
   */
  async generateToken(args: AES_Generate_Token_Params) {
    return await this.execute("/auth/token/create", args);
  }

  /**
   * Refreshes an existing security token before it expires.
   *
   * Updates a security token to extend its validity period without requiring
   * the user to go through the full authentication flow again. This should be
   * called before the current security token expires to maintain uninterrupted
   * access to secured API endpoints.
   *
   * @param args - Parameters required for security token refresh, including the refresh token
   * @returns API response with the refreshed security token and updated expiration information
   * @link https://open.aliexpress.com/doc/api.htm#/api?cid=3&path=/auth/token/security/refresh&methodType=GET/POST
   */
  async refreshSecurityToken(args: AES_Refresh_Security_Token_Params) {
    return await this.execute("/auth/token/security/refresh", args);
  }

  /**
   * Refreshes a standard authentication token before it expires.
   *
   * Updates a regular access token to extend its validity period without requiring
   * the user to go through the full authentication flow again. This should be called
   * before the current token expires to maintain uninterrupted API access.
   *
   * Token refresh is an essential part of maintaining long-running applications
   * that interact with the AliExpress API.
   *
   * @param args - Parameters required for token refresh, including the refresh token
   * @returns API response with the refreshed token and updated expiration information
   * @link https://open.aliexpress.com/doc/api.htm#/api?cid=3&path=/auth/token/refresh&methodType=GET/POST
   */
  async refreshToken(args: AES_Refresh_Token_Params) {
    return await this.execute("/auth/token/refresh", args);
  }
}
