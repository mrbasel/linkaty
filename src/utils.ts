import AsyncStorage from "@react-native-async-storage/async-storage";
import { ApiConfig, Bookmark, Tag } from "./types";
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

export function getMostUsedTags(bookmarks: Bookmark[], limit = 3) {
  const tagsDict: { [name: string]: number } = {};

  for (const tag of bookmarks.flatMap(bookmark => bookmark.tag_names)) {
    if (!tagsDict[tag]) tagsDict[tag] = 0;
    tagsDict[tag] += 1;
  }
  const sortedTagsByUse = Object.entries(tagsDict).sort((a, b) => b[1] - a[1]);
  console.log(sortedTagsByUse);
  return sortedTagsByUse.slice(0, limit).map(tag => tag[0]);
}
