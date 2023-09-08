import { useState, useContext, useEffect } from "react";
import { ResourceContext } from "../contexts";
import { LinkdingResource } from "../resources/linkdingResource";
import { Resource } from "../types";
import { useAuthContext } from "./useAuth";

export function useResourse() {
  const [resource, setResource] = useState<Resource | null>(null);
  const { isLoggedIn, apiConfig } = useAuthContext();

  useEffect(() => {
    if (!isLoggedIn) return;
    if (!apiConfig) return;

    setResource(new LinkdingResource(apiConfig));
  }, [apiConfig, isLoggedIn]);
  return resource;
}

export function useResourseContext() {
  return useContext(ResourceContext) as Resource;
}
