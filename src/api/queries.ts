import { useQuery } from "@tanstack/react-query";
import { Bookmark, BookmarksType, Tag } from "../types";
import { getApiConfig } from "../utils";

function constructQuery(baseUrl: string, type: BookmarksType, query?: string) {
  let q = "";
  const url = new URL(`${baseUrl}/api/bookmarks`);
  if (type !== "all") q = `!${type}`;
  if (type !== "all" && query) q = `${q}+${query.replace(" ", "+")}`.trim();
  if (type === "all" && query) q = `${query}`.trim();
  if (q) url.searchParams.append("q", q);
  return url.href;
}

async function fetchBookmarks(
  type: Exclude<BookmarksType, "archived">,
  query?: string,
): Promise<Bookmark[]> {
  const apiConfig = await getApiConfig();
  const url = constructQuery(apiConfig.serverUrl, type, query);

  const response = await fetch(url, {
    headers: {
      Authorization: `Token ${apiConfig.apiToken}`,
    },
  });
  const data = await response.json();
  return data?.results ?? [];
}

async function fetchArchivedBookmarks(): Promise<Bookmark[]> {
  const apiConfig = await getApiConfig();
  const response = await fetch(
    `${apiConfig.serverUrl}/api/bookmarks/archived`,
    {
      headers: {
        Authorization: `Token ${apiConfig?.apiToken}`,
      },
    },
  );
  const data = await response.json();
  return data?.results ?? [];
}

export function useBookmarks(type: BookmarksType, query?: string) {
  let queryFn =
    type === "archived"
      ? fetchArchivedBookmarks
      : () => fetchBookmarks(type, query);
  return useQuery({
    queryKey: ["bookmarks", type, query].filter(String),
    queryFn: queryFn,
  });
}

async function fetchTags(): Promise<Tag[]> {
  const apiConfig = await getApiConfig();
  const response = await fetch(`${apiConfig.serverUrl}/api/tags`, {
    headers: {
      Authorization: `Token ${apiConfig.apiToken}`,
    },
  });
  const data = await response.json();
  return data?.results ?? [];
}

export function useTags() {
  return useQuery({ queryKey: ["tags"], queryFn: fetchTags });
}
