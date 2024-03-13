import { ReactNode } from "react";

type KeyValueMap = Record<string, string>;

interface QueryProviderProps {
  client: ClientProviderParamsI;
  children: ReactNode;
}

export type Options = {
  method?: "GET" | "PUT" | "PATCH" | "DELETE" | "POST";
  headers?: KeyValueMap;
  body?: any;
  queryParams?: KeyValueMap;
  url?: string;
  timeout?: number;
};

type ClientProviderParamsI = {
  url: string;
  authToken?: string;
  defaultHeaders?: KeyValueMap;
};

/**
 * Custom hook for making HTTP requests.
 * @param method The HTTP method for the request (GET, PUT, PATCH, DELETE, POST).
 * @param headers Additional headers to include in the request.
 * @param body The data to be sent in the request body.
 * @param queryParams Query parameters to be appended to the URL.
 * @param url The URL for the request.
 * @param timeout The timeout duration for the request in milliseconds.
 * @returns An object containing the fetched data, error message, loading status, and functions for making POST, PUT, and PATCH requests.
 */
export declare function useQuery(
  method?: "GET" | "PUT" | "PATCH" | "DELETE" | "POST",
  headers?: KeyValueMap,
  body?: any,
  queryParams?: KeyValueMap,
  url?: string,
  timeout?: number
): {
  /**
   * The fetched data from HTTP requests
   */
  data: any;
  /**
   * Any error message returned from the HTTP request, or null if no error occurred.
   */
  error: string | null;
  /**
   * A boolean indicating whether the request is currently in progress.
   */
  isLoading: boolean;
  postData: (payload?: any) => void;
  putData: (payload?: any) => void;
  patchData: (payload?: any) => void;
};

export declare function QueryProvider(props: QueryProviderProps): JSX.Element;

/**
 * Configuration class for the client provider.
 */
export declare class ClientProviderConfig {
  /**
   * The base URL for the requests.
   */
  url: string;
  /**
   * Optional authentication token to be included in the headers.
   */
  authToken?: string;
  /**
   * Default headers to be included in the requests.
   */
  defaultHeaders?: Record<string, string>;
  /**
   * Constructor for the ClientProviderConfig class.
   * @param url The base URL for the requests.
   * @param authToken Optional authentication token to be included in the headers.
   * @param defaultHeaders Default headers to be included in the requests.
   */
  constructor({ url, authToken, defaultHeaders }: ClientProviderParamsI);
}
