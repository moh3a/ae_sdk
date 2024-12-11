/**
 * Represents the result of an asynchronous operation that can either succeed or fail.
 * @template T The type of data returned on success
 */
export type Result<T> = Promise<SuccessResult<T> | ErrorResult>;

/**
 * Represents a successful operation result
 * @template T The type of data returned
 */
type SuccessResult<T> = {
  /** Indicates the operation was successful */
  ok: true;
  /** The successful operation's returned data */
  data: T;
}

/**
 * Represents a failed operation result
 */
type ErrorResult = {
  /** Indicates the operation failed */
  ok: false;
  /** Human-readable error message */
  message: string;
  /** Unique identifier for the request, useful for debugging */
  request_id?: string;
  /** Detailed API error response, if available */
  error_response?: ErrorResponse;
  /** JavaScript Error object, if available */
  error?: Error;
}

export type ErrorType = 'ISV' | 'SYSTEM' | 'ISP';

export interface ErrorResponse {
  /** 
   * Represents the type of error that occurred from AliExpress Open Platform
   * - SYSTEM: API platform error
   * - ISV: Business data error
   * - ISP: Backend service error
   * @see {@link https://openservice.aliexpress.com/doc/doc.htm?nodeId=27493&docId=118729#/?docId=1372 AliExpress Error Codes Documentation}
   */
  type?: ErrorType;
  code?: string;
  sub_code?: string;
  msg?: string;
  sub_msg?: string;
  request_id?: string;
  [key: string]: string | undefined;
}

export * from "./ae";
export * from "./affiliate";
export * from "./ds";
export * from "./system";
