import { ReactNode } from "react";

export type Client = {
  url: string;
};

export interface QueryProviderProps {
  client: Client;
  children: ReactNode;
}

export type Options = {
  method?: "GET" | "PUT" | "PATCH" | "DELETE" | "POST";
  headers?: Record<string, string>;
  body?: any;
  queryParams?: Record<string, string>;
  timeout?: number;
};

export type KeyValueMap = Record<string, string>;

export type ClientProviderParamsI = {
  url: string;
  authToken?: string;
  defaultHeaders?: KeyValueMap;
};

// Declaration for useQuery function
export declare function useQuery(
  url?: string,
  options?: Options
): { data: any; error: string | null; isLoading: boolean };

// Declaration for QueryProvider function
export declare function QueryProvider(props: QueryProviderProps): JSX.Element;

// Declaration for QueryContext constant
export declare const QueryContext: React.Context<any>;

export declare class ClientProviderConfig {
  url: string;
  authToken?: string;
  defaultHeaders?: Record<string, string>;
  constructor({ url, authToken, defaultHeaders }: ClientProviderParamsI);
}
