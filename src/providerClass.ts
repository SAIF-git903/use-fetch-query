import { ClientProviderParamsI } from "./types";

export default class ClientProviderConfig {
  url: string;
  authToken?: string;
  defaultHeaders?: Record<string, string>;

  constructor({ url, authToken, defaultHeaders }: ClientProviderParamsI) {
    this.url = url;
    this.authToken = authToken;
    this.defaultHeaders = defaultHeaders;
  }
}
