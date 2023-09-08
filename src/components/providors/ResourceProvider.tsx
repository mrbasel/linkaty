import React from "react";
import { ResourceContext } from "../../contexts";
import { useResourse } from "../../hooks/useResourse";

export function ResourceProvider({ children }: { children: React.ReactNode }) {
  const resource = useResourse();
  return (
    <ResourceContext.Provider value={resource}>
      {children}
    </ResourceContext.Provider>
  );
}
