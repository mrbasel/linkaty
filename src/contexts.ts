import React from "react";
import { useAuth } from "./hooks/useAuth";

export const AuthContext = React.createContext<ReturnType<typeof useAuth>>({
  apiConfig: null,
  isFetched: false,
  isLoggedIn: false,
  setConfig: () => Promise.resolve(),
});
