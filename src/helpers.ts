import { KeyValueMap } from "./types";

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

export default getUrl;
