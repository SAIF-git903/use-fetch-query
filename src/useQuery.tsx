import { useState, useEffect } from "react";
import { useContext } from "react";
import { QueryContext } from "./provider";
import { Options } from "./types";

export function useQuery(url?: string, options: Options = {}) {
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const context = useContext(QueryContext);

  useEffect(() => {
    let controller: AbortController;

    const fetchData = async () => {
      setIsLoading(true);
      setError(null);

      const apiUrl = getUrl(url, context);

      const {
        method = "GET",
        headers = {},
        body,
        queryParams,
        timeout,
      } = options;

      controller = new AbortController();
      const signal = controller.signal;

      const fetchOptions: RequestInit = {
        method,
        headers: {
          "Content-Type": "application/json",
          ...headers,
        },
        signal,
      };

      if (method !== "GET") {
        fetchOptions.body = JSON.stringify(body);
      }

      try {
        let fetchPromise: Promise<Response | any>;
        if (timeout && method !== "GET") {
          fetchPromise = Promise.race([
            fetch(apiUrl, fetchOptions),
            new Promise((_, reject) => {
              const timeoutId = setTimeout(() => {
                controller.abort();
                reject(new Error("Request timed out"));
              }, timeout);
              // Clear the timeout when the fetch completes
              fetchPromise.then(() => clearTimeout(timeoutId));
            }),
          ]);
        } else {
          fetchPromise = fetch(apiUrl, fetchOptions);
        }

        const response = await fetchPromise;

        if (!response.ok) {
          setError("Network response was not ok");
        }

        const responseData = await response.json();
        setData(responseData);
      } catch (error: any) {
        setError(error.message || "An error occurred");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();

    return () => {
      if (controller) {
        // Cleanup function to abort ongoing requests if component re-renders or unmounts
        controller.abort();
      }
    };
  }, []);

  return { data, error, isLoading };
}

function getUrl(url?: string, context?: any): string {
  if (url) {
    return url;
  } else if (context && context.url) {
    return context.url;
  } else {
    throw new Error(
      "URL must be provided in useQuery or context.url must be set when Wrapping around QueryContext"
    );
  }
}
