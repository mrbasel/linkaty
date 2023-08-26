import { useCallback, useEffect, useState } from "react";
import { ApiConfig } from "../types";
import * as Keychain from "react-native-keychain";

export function useAuth() {
  const [apiConfig, setApiConfig] = useState<ApiConfig | null>(null);
  const [isFetched, setIsFetched] = useState(false);

  const isLoggedIn = Boolean(apiConfig?.serverUrl && apiConfig?.apiToken);

  const setConfig = useCallback(async (config: ApiConfig) => {
    try {
      const response = await Keychain.setGenericPassword(
        "apiConfig",
        JSON.stringify(config),
        {
          service: "linkding",
        },
      );
      console.log(response);
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
        console.log(response);
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
