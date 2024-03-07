import { ReactNode } from "react";

export type Client = {
  url: string;
};

export interface QueryProviderProps {
  client: Client;
  children: ReactNode;
}

type Options = {
  method?: "GET" | "PUT" | "PATCH" | "DELETE" | "POST";
  headers?: Record<string, string>;
  body?: any;
  queryParams?: Record<string, string>;
  timeout?: number;
};
