# useQuery

`useQuery` is a lightweight custom hook for making HTTP requests using the fetch API in React applications.

## Installation

You can install the package via npm:

```bash
npm i use-fetch-query
```

## Usage

```javascript
import { useQuery } from "your-package-name";

// Example usage:
useQuery("https://api.example.com/data", {
  method: "GET",
  headers: {
    Authorization: "Bearer <your-token>",
  },
  queryParams: {
    param1: "value1",
  },
})
  .then((data) => {
    // Handle API response
    console.log(data);
  })
  .catch((error) => {
    // Handle error
    console.error(error);
  });
```

## Parameters

- `url` (string): The URL to which the request will be sent.
- `options` (object, optional): Optional parameters for configuring the request.
  - `method` (string): The HTTP method for the request (default: 'GET').
  - `headers` (object): Additional headers to include in the request.
  - `body` (object): The request payload.
  - `queryParams` (object): Query parameters to append to the URL.
#   u s e - f e t c h - q u e r y  
 