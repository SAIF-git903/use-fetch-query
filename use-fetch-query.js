// Your custom function for API calls (apiCaller.js)
export function useQuery(url, options = {}) {
  const { method = "GET", headers = {}, body, queryParams } = options;

  let apiUrl = new URL(url);
  if (queryParams) {
    Object.keys(queryParams).forEach((key) => {
      apiUrl.searchParams.append(key, queryParams[key]);
    });
  }

  return fetch(apiUrl.toString(), {
    method,
    headers: new Headers({
      "Content-Type": "application/json",
      ...headers,
    }),
    body: JSON.stringify(body),
  }).then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  });
}
