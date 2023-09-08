import { useCallback, useContext, useEffect, useState } from "react";
import { ApiConfig } from "../types";
import * as Keychain from "react-native-keychain";
import { AuthContext } from "../contexts";

export function useAuth() {
  const [apiConfig, setApiConfig] = useState<ApiConfig | null>(null);
  const [isFetched, setIsFetched] = useState(false);

  const isLoggedIn = Boolean(apiConfig?.serverUrl && apiConfig?.apiToken);

  const setConfig = useCallback(async (config: ApiConfig) => {
    try {
      await Keychain.setGenericPassword("apiConfig", JSON.stringify(config), {
        service: "linkding",
      });
      setApiConfig(config);
    } catch (e) {
      throw e;
    }
  }, []);

  useEffect(() => {
    async function getApiConfig() {
      try {
        const response = await Keychain.getGenericPassword({
          service: "linkding",
        });
        if (!response) return;

        const config = JSON.parse(response.password ?? "{}");
        setApiConfig(config);
      } catch (e) {
        throw e;
      } finally {
        setIsFetched(true);
      }
    }
    getApiConfig();
  }, []);

  return { apiConfig, isLoggedIn, isFetched, setConfig };
}

export function useAuthContext() {
  return useContext(AuthContext);
}
