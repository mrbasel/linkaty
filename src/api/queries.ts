import { API_URL, TOKEN } from "@env";
import { useQuery } from "@tanstack/react-query";
import { Bookmark, BookmarksType, Tag } from "../types";

async function fetchBookmarks(
  type: Exclude<BookmarksType, "archived">,
): Promise<Bookmark[]> {
  let queryFilter = "";
  if (type !== "all") {
    queryFilter = "?q=!" + type;
  }

  const url = `${API_URL}/api/bookmarks${queryFilter}`;

  const response = await fetch(url, {
    headers: {
      Authorization: `Token ${TOKEN}`,
    },
  });
  const data = await response.json();
  return data?.results ?? [];
}

async function fetchArchivedBookmarks(): Promise<Bookmark[]> {
  const response = await fetch(`${API_URL}/api/bookmarks/archived`, {
    headers: {
      Authorization: `Token ${TOKEN}`,
    },
  });
  const data = await response.json();
  return data?.results ?? [];
}

export function useBookmarks(type: BookmarksType) {
  let queryFn =
    type === "archived" ? fetchArchivedBookmarks : () => fetchBookmarks(type);
  return useQuery({ queryKey: [type], queryFn: queryFn });
}

async function fetchTags(): Promise<Tag[]> {
  const response = await fetch(`${API_URL}/api/tags`, {
    headers: {
      Authorization: `Token ${TOKEN}`,
    },
  });
  const data = await response.json();
  return data?.results ?? [];
}

export function useTags() {
  return useQuery({ queryKey: ["tags"], queryFn: fetchTags });
}
