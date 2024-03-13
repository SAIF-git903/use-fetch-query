import { useContext, useEffect, useState } from "react";
import getUrl from "./helpers";
import { QueryContext } from "./provider";
import { ClientProviderParamsI, Options } from "./types";

export function useQuery(options: Options = {}) {
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const context: ClientProviderParamsI | any = useContext(QueryContext);

  // Default Method is set to GET in case user don't provide one.
  const { method = "GET", headers = {}, body, timeout, queryParams } = options;
  const apiUrl = getUrl(options.url, context, queryParams);

  // useEffect for handling GET request
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
                : undefined,
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

  // Function to make a Execute a request
  const executeRequest = async (method: string, payload?: any) => {
    try {
      const response = await fetch(apiUrl, {
        method,
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

  const postData = async (payload?: any) => {
    await executeRequest("POST", payload);
  };

  const putData = async (payload?: any) => {
    await executeRequest("PUT", payload);
  };

  const patchData = async (payload?: any) => {
    await executeRequest("PATCH", payload);
  };

  return { data, error, isLoading, postData, putData, patchData };
}
