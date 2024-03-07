import React, { createContext } from "react";
import { QueryProviderProps } from "./types";

export const QueryContext = createContext(null);

function QueryProvider({ children, client }: QueryProviderProps) {
  return (
    <QueryContext.Provider value={(client as any) ?? ""}>
      {children}
    </QueryContext.Provider>
  );
}

export { QueryProvider };
