import { useContext, useEffect, useState } from "react";
import getUrl from "./helpers";
import { QueryContext } from "./provider";
import { ClientProviderParamsI, Options } from "./types";

export function useQuery(options: Options = {}) {
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const context: ClientProviderParamsI | any = useContext(QueryContext);

  const {
    method: defaultMethod = "GET",
    headers: defaultHeaders = {},
    timeout,
    queryParams: defaultQueryParams,
    url: defaultUrl,
  } = options;

  const apiUrl = getUrl(defaultUrl, context, defaultQueryParams);

  useEffect(() => {
    const fetchData = async () => {
      setError(null);

      if (defaultMethod === "GET") {
        setIsLoading(true);
        try {
          const response = await fetch(apiUrl, {
            method: defaultMethod,
            headers: {
              "Content-Type": "application/json",
              ...defaultHeaders,
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
  }, [defaultMethod, defaultUrl, context]);

  const executeRequest = async (method: string, payload?: any) => {
    try {
      const response = await fetch(apiUrl, {
        method,
        headers: {
          "Content-Type": "application/json",
          ...defaultHeaders,
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
