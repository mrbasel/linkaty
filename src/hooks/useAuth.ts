import AsyncStorage from "@react-native-async-storage/async-storage";
import { useCallback, useEffect, useState } from "react";
import { ApiConfig } from "../types";

export function useAuth() {
  const [apiConfig, setApiConfig] = useState<ApiConfig | null>(null);
  const [isFetched, setIsFetched] = useState(false);

  const isLoggedIn = Boolean(apiConfig?.serverUrl && apiConfig?.apiToken);

  const setConfig = useCallback(async (config: ApiConfig) => {
    try {
      await AsyncStorage.setItem("apiConfig", JSON.stringify(config));
      setApiConfig(config);
    } catch (e) {
      throw e;
    }
  }, []);

  useEffect(() => {
    async function getApiConfig() {
      try {
        const configString = await AsyncStorage.getItem("apiConfig");
        const config = JSON.parse(configString ?? "{}");
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
