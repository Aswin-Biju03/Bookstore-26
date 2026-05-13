import React, { createContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { RouterContextProvider } from "react-router-dom";
export const routeContext = createContext("");

function RouteGuardContent({ children }) {
  const [role, setRole] = useState("");
  const [authorisedUser, setAuthorisedUser] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem("token") && sessionStorage.getItem("user")) {
      const user = JSON.parse(sessionStorage.getItem("user"));
      setAuthorisedUser(true);
      setRole(user.role);
    }
  }, [role, authorisedUser]);
  return (
    <routeContext.Provider
      value={{ role, setRole, authorisedUser, setAuthorisedUser }}
    >
      {children}
    </routeContext.Provider>
  );
}

export default RouteGuardContent;
