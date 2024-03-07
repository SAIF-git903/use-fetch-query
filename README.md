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
  const { data, postData } = useQuery({ method: "GET" });

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
import React from "react";
import ReactDOM from "react-dom";
import { QueryProvider } from "use-fetch-query";

// Define the client configuration
// This url in client configuration is the base URL if you don't specify the url in useQuery("https://api.example.com/data")

const client = {
  url: "https://api.example.com",
};

// Render your application wrapped with QueryProvider
ReactDOM.render(
  <QueryProvider client={client}>
    <App />
  </QueryProvider>,
  document.getElementById("root")
);
```

## Parameters

- `url` (string): The URL to which the request will be sent.
- `options` (object, optional): Optional parameters for configuring the request.
  - `method` (string): The HTTP method for the request (default: 'GET').
  - `headers` (object): Additional headers to include in the request.
  - `body` (object): The request payload.
  - `queryParams` (object): Query parameters to append to the URL.
