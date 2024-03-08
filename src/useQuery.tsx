import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { useContext, useEffect, useState } from "react";
import { QueryContext } from "./provider";
import { ClientProviderParamsI, KeyValueMap } from "./types";

type Options = {
  method?: "GET" | "PUT" | "PATCH" | "DELETE" | "POST";
  headers?: Record<string, string>;
  body?: any;
  queryParams?: Record<string, string>;
  url?: string;
  timeout?: number;
};

export function useQuery(options: Options = {}) {
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const context: ClientProviderParamsI | any = useContext(QueryContext);

  const { method = "GET", headers = {}, body, timeout, queryParams } = options;
  const apiUrl = getUrl(options.url, context, queryParams);

  useEffect(() => {
    let source = axios.CancelToken.source();

    const fetchData = async () => {
      setIsLoading(true);
      setError(null);

      if (options.method === "GET") {
        const axiosOptions: AxiosRequestConfig = {
          method,
          headers: {
            "Content-Type": "application/json",
            ...headers,
            ...context.defaultHeaders,
            Authorization: context?.authToken
              ? `Bearer ${context?.authToken}`
              : null,
          },
          cancelToken: source.token,
        };

        if (method !== "GET") {
          axiosOptions.data = body;
        }

        if (timeout && method !== "GET") {
          axiosOptions.timeout = timeout;
        }

        try {
          const response: AxiosResponse = await axios(apiUrl, axiosOptions);

          setData(response.data);
        } catch (error: any) {
          if (axios.isCancel(error)) {
            // Request cancelled, no need to set error
          } else if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            setError("Network response was not ok");
          } else if (error.request) {
            // The request was made but no response was received
            setError("No response received");
          } else {
            // Something happened in setting up the request that triggered an Error
            setError("An error occurred");
          }
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      source.cancel("Component unmounted");
    };
  }, [options.method, options.url, context]);

  // Function to make a POST request
  const postData = async (payload?: any) => {
    try {
      const response: AxiosResponse = await axios.post(apiUrl, payload, {
        headers: {
          "Content-Type": "application/json",
          ...options.headers,
          ...context.defaultHeaders,
          Authorization: context?.authToken
            ? `Bearer ${context?.authToken}`
            : null,
        },
      });
      setData(response.data);
    } catch (error: any) {
      setError(error.message || "An error occurred");
    }
  };

  return { data, error, isLoading, postData };
}

function getUrl(
  url?: string,
  context?: any,
  queryParams?: KeyValueMap
): string {
  if (!url && (!context || !context.url)) {
    throw new Error(
      "URL must be provided in useQuery or context.url must be set when Wrapping around QueryContext"
    );
  }

  let $URL: string = url || context.url;

  let queryString = "";
  if (queryParams) {
    const params = Object.entries(queryParams)
      .map(
        ([key, value]) =>
          `${encodeURIComponent(key)}=${encodeURIComponent(value as any)}`
      )
      .join("&");
    queryString = `?${params}`;
  }

  return `${$URL}${queryString}`;
}
