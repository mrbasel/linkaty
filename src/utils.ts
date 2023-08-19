import AsyncStorage from "@react-native-async-storage/async-storage";
import { ApiConfig } from "./types";

export function getIsValidUrl(urlString: string) {
  let url: URL | null = null;
  try {
    url = new URL(urlString);
  } catch (_) {
    return false;
  }

  return Boolean(url);
}

export async function getApiConfig(): Promise<ApiConfig> {
  try {
    const apiConfigString = await AsyncStorage.getItem("apiConfig");
    const apiConfig = JSON.parse(apiConfigString ?? "{}");
    return apiConfig;
  } catch (e) {
    throw e;
  }
}

export async function setApiConfig({ serverUrl, apiToken }: ApiConfig) {
  console.log("setApiConfig");
  try {
    await AsyncStorage.setItem(
      "apiConfig",
      JSON.stringify({ serverUrl, apiToken }),
    );
  } catch (e) {
    throw e;
  }
}
