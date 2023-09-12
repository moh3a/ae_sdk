export interface AES_Base_Access_Token_Result {
  account_id: string;
  seller_id: string;
  user_id: string;
  sp: string;
  access_token: string;
  refresh_token: string;
  expires_in: number;
  expire_time: number;
  refresh_token_valid_time: number;
  refresh_expires_in: number;
  locale: string;
}

export interface AES_Access_Token_Result extends AES_Base_Access_Token_Result {
  havana_id: string;
  user_nick: string;
  account: string;
  account_platform: string;
}

/**
 * SYSTEM SERVICES
 * GENERATE SECURITY TOKEN
 */

export interface AES_Generate_Security_Token_Params {
  code: string;
  uuid?: string;
}

export interface AES_Generate_Security_Token_Result
  extends AES_Base_Access_Token_Result {}

/**
 * SYSTEM SERVICES
 * GENERATE ACCESS TOKEN
 */
export interface AES_Generate_Token_Params
  extends AES_Generate_Security_Token_Params {}

export interface AES_Generate_Token_Result extends AES_Access_Token_Result {}

/**
 * SYSTEM SERVICES
 * REFRESH SECURITY TOKEN
 */
export interface AES_Refresh_Security_Token_Params
  extends AES_Refresh_Token_Params {}

export interface AES_Refresh_Security_Token_Result
  extends AES_Access_Token_Result {}

/**
 * SYSTEM SERVICES
 * REFRESH ACCESS TOKEN
 */
export interface AES_Refresh_Token_Params {
  refresh_token: string;
}

export interface AES_Refresh_Token_Result extends AES_Access_Token_Result {}
