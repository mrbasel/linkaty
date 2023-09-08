import React from "react";
import { useAuth } from "./hooks/useAuth";
import { Resource } from "./types";

export const AuthContext = React.createContext<ReturnType<typeof useAuth>>({
  apiConfig: null,
  isFetched: false,
  isLoggedIn: false,
  setConfig: () => Promise.resolve(),
});

export const ResourceContext = React.createContext<Resource | null>(null);
