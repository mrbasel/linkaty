import AsyncStorage from "@react-native-async-storage/async-storage";
import { ApiConfig } from "./types";
import * as Keychain from "react-native-keychain";

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
    const response = await Keychain.getGenericPassword({
      service: "linkding",
    });
    if (!response) throw new Error("No entry found");
    const apiConfig = JSON.parse(response.password ?? "{}");
    return apiConfig;
  } catch (e) {
    throw e;
  }
}
