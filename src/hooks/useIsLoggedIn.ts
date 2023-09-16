import { useAuthContext } from "./useAuth";
import { useResourseContext } from "./useResourse";

export function useIsLoggedIn() {
  const { apiConfig } = useAuthContext();
  const resource = useResourseContext();
  return Boolean(apiConfig?.serverUrl && apiConfig?.apiToken && resource);
}
