import { ReactNode } from "react";

/**
 * A key-value map interface.
 */
type KeyValueMap = Record<string, string>;

/**
 * Props for the QueryProvider component.
 */
interface QueryProviderProps {
  /**
   * Configuration for the client provider.
   */
  client: ClientProviderParamsI;
  /**
   * The child elements to be wrapped by the QueryProvider.
   */
  children: ReactNode;
}

/**
 * Configuration options for making HTTP requests.
 */
export type Options = {
  /**
   * The HTTP method for the request (GET, PUT, PATCH, DELETE, POST).
   */
  method?: "GET" | "PUT" | "PATCH" | "DELETE" | "POST";
  /**
   * Additional headers to include in the request.
   */
  headers?: KeyValueMap;
  /**
   * Query parameters to be appended to the URL.
   */
  queryParams?: KeyValueMap;
  /**
   * The URL for the request.
   */
  url?: string;
  /**
   * The timeout duration for the request in milliseconds.
   */
  timeout?: number;
};

/**
 * Parameters for the client provider.
 */
type ClientProviderParamsI = {
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
  defaultHeaders?: KeyValueMap;
};

/**
 * Custom hook for making HTTP requests.
 * @param options The configuration options for the request.
 * @returns An object containing the fetched data, error message, loading status, and functions for making POST, PUT, and PATCH requests.
 */
export declare function useQuery(options?: Options): {
  /**
   * The fetched data from HTTP requests.
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
  /**
   * Function for making a POST request.
   * @param payload Optional data to be sent in the request body.
   */
  postData: (payload?: any) => void;
  /**
   * Function for making a PUT request.
   * @param payload Optional data to be sent in the request body.
   */
  putData: (payload?: any) => void;
  /**
   * Function for making a PATCH request.
   * @param payload Optional data to be sent in the request body.
   */
  patchData: (payload?: any) => void;
};

/**
 * Component for providing query functionality to child components.
 * @param props The properties for the QueryProvider component.
 * @returns The QueryProvider component.
 */
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
