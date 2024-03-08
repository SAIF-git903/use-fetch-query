import { ClientProviderParamsI, KeyValueMap } from "./types";

export default class ClientProviderConfig {
  url: string;
  authToken?: string;
  defaultHeaders?: KeyValueMap;

  constructor({ url, authToken, defaultHeaders }: ClientProviderParamsI) {
    this.url = url;
    this.authToken = authToken;
    this.defaultHeaders = defaultHeaders;
  }
}
