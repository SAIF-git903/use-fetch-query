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
  const { data, error, isLoading } = useQuery("https://api.example.com/data", {
    method: "GET",
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

## Parameters

- `url` (string): The URL to which the request will be sent.
- `options` (object, optional): Optional parameters for configuring the request.
  - `method` (string): The HTTP method for the request (default: 'GET').
  - `headers` (object): Additional headers to include in the request.
  - `body` (object): The request payload.
  - `queryParams` (object): Query parameters to append to the URL.