export type Result<K> = Promise<
  | {
      ok: true;
      data: K;
    }
  | { ok: false; message: string; request_id?: string }
>;

export {
  AE_Currency,
  AE_Language,
  AE_Logistics_Status,
  AE_Order_Status,
  AE_Platform_Type,
  AE_Sort_Filter,
  AE_Sort_Promo_Filter,
} from "./ae";
