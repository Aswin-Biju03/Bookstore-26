import React, { Children, createContext, useState } from "react";

export const searchContext = createContext("");

function ShareContextAPI({ children }) {
  const [searchKey, setSearchKey] = useState("");
  return (
    <searchContext.Provider value={{ searchKey, setSearchKey }}>
      {children}
    </searchContext.Provider>
  );
}

export default ShareContextAPI;
