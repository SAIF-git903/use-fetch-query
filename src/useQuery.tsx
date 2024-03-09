import { useContext, useEffect, useState } from "react";
import { QueryContext } from "./provider";
import { ClientProviderParamsI, KeyValueMap, Options } from "./types";


export function useQuery(options: Options = {}) {
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const context: ClientProviderParamsI | any = useContext(QueryContext);

  const { method = "GET", headers = {}, body, timeout, queryParams } = options;
  const apiUrl = getUrl(options.url, context, queryParams);

  useEffect(() => {
    const fetchData = async () => {
      setError(null);
      
      if (method === "GET") {
        setIsLoading(true);
        try {
          const response = await fetch(apiUrl, {
            method,
            headers: {
              "Content-Type": "application/json",
              ...headers,
              ...context?.defaultHeaders,
              Authorization: context?.authToken
                ? `Bearer ${context?.authToken}`
                : undefined, // null headers are removed automatically
            },
          });

          if (!response.ok) {
            throw new Error("Network response was not ok");
          }

          const responseData = await response.json();
          setData(responseData);
        } catch (error: any) {
          setError(error.message || "An error occurred");
        } finally {
          setIsLoading(false);
        }
      }
    };

    
    fetchData();
  }, [options.method, options.url, context]);

  // Function to make a POST request
  const postData = async (payload?: any) => {
    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...headers,
          ...context?.defaultHeaders,
          Authorization: context?.authToken
            ? `Bearer ${context?.authToken}`
            : undefined,
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const responseData = await response.json();
      setData(responseData);
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
    const params = new URLSearchParams(queryParams).toString();
    queryString = `?${params}`;
  }

  return `${$URL}${queryString}`;
}
