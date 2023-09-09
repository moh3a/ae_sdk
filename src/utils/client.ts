import { createHash } from "crypto";

import { AE_Base_Client, AE_Response_Format, PublicParams } from "../types/ae";
import { Timestamp } from "../types";

export class AEBaseClient implements AE_Base_Client {
  readonly app_key: string;
  readonly app_secret: string;
  readonly url: string;
  readonly format: AE_Response_Format;

  protected readonly v = "2.0";
  protected readonly sign_method = "md5";

  constructor(init: AE_Base_Client) {
    this.app_key = init.app_key;
    this.app_secret = init.app_secret;
    this.url = init.url ?? "https://api.taobao.com/router/rest";
    this.format = init.format ?? "json";
  }

  protected sign(params: any): string {
    let sorted = Object.keys(params).sort();
    let basestring = this.app_secret;

    for (let i = 0; i < sorted.length; i++) {
      basestring += sorted[i] + params[sorted[i] as keyof typeof params];
    }
    basestring += this.app_secret;

    return createHash("md5")
      .update(basestring, "utf-8")
      .digest("hex")
      .toUpperCase();
  }

  protected async call<T extends PublicParams, K>(params: T) {
    try {
      let basestring = this.url;
      let sorted = Object.keys(params).sort();

      for (let i = 0; i < sorted.length; i++) {
        let symbol = i === 0 ? "?" : "&";
        if (params[sorted[i] as keyof typeof params])
          basestring +=
            symbol +
            sorted[i] +
            "=" +
            encodeURIComponent(
              params[sorted[i] as keyof typeof params] as
                | number
                | string
                | boolean,
            );
      }

      const res = await fetch(basestring, { method: "POST" });
      return (await res.json()) as K;
    } catch (error) {
      console.error(error);
      return;
    }
  }

  protected get_timestamp(d?: Timestamp) {
    d = d || new Date();
    if (!(d instanceof Date)) {
      d = new Date(d);
    }
    let dateSep = "-";
    let timeSep = ":";
    let date: Timestamp = d.getDate();
    if (date < 10) {
      date = "0" + date;
    }
    let month: Timestamp = d.getMonth() + 1;
    if (month < 10) {
      month = "0" + month;
    }
    let hours: Timestamp = d.getHours();
    if (hours < 10) {
      hours = "0" + hours;
    }
    let mintues: Timestamp = d.getMinutes();
    if (mintues < 10) {
      mintues = "0" + mintues;
    }
    let seconds: Timestamp = d.getSeconds();
    if (seconds < 10) {
      seconds = "0" + seconds;
    }
    return (
      d.getFullYear() +
      dateSep +
      month +
      dateSep +
      date +
      " " +
      hours +
      timeSep +
      mintues +
      timeSep +
      seconds
    );
  }
}
