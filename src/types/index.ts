export type Result<K> = Promise<
  | {
      ok: true;
      data: K;
    }
  | { ok: false; message: string; request_id?: string }
>;

export * from "./ae";
export * from "./affiliate";
export * from "./ds";
export * from "./system";
