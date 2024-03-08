# use-fetch-query

`use-fetch-query` is a lightweight custom hook for making HTTP requests using the fetch API in React applications.

## Installation

You can install the package via npm:

```bash
npm i use-fetch-query
```

## Usage

```javascript
import { useQuery } from "use-fetch-query";

function MyComponent() {
  const { data, error, isLoading } = useQuery({
    method: "GET",
    url: "https://api.example.com/data",
  });

  // Handle loading state
  if (isLoading) {
    return <div>Loading...</div>;
  }

  // Handle error
  if (error) {
    return <div>Error: {error}</div>;
  }

  // Render data
  return (
    <div>
      <h1>Data:</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}

export default MyComponent;
```

## POST request

```javascript
function App() {
  const { data, postData } = useQuery();

  useEffect(() => {
    console.log(data, "data");
  }, [data]);

  return (
    <div>
      <button onClick={() => postData({ hi: "send me" })}>Make a post</button>
    </div>
  );
}
```

# QueryProvider

The `QueryProvider` component is a part of the `use-fetch-query` package, providing context for making HTTP requests using the fetch API in React applications.

## Usage

```javascript
import App from "./App";
import React from "react";
import ReactDOM from "react-dom/client";
import { QueryProvider, ClientProviderConfig } from "use-fetch-query";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const clientConfig = new ClientProviderConfig({
  url: "http://localhost",
  defaultHeaders: {
    name: "Content-Type",
    value: "application/json",
  },
});

root.render(
  <React.StrictMode>
    <QueryProvider client={clientConfig}>
      <App />
    </QueryProvider>
  </React.StrictMode>
);

```

## Parameters

- `url` (string): The URL to which the request will be sent.
- `options` (object, optional): Optional parameters for configuring the request.
  - `method` (string): The HTTP method for the request (default: 'GET').
  - `headers` (object): Additional headers to include in the request.
  - `body` (object): The request payload.
  - `queryParams` (object): Query parameters to append to the URL.
