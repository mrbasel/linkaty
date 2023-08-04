import { API_URL, TOKEN } from "@env";
import { useQuery } from "@tanstack/react-query";
import { Bookmark } from "../types";

async function fetchBookmarks(): Promise<Bookmark[]> {
  const response = await fetch(`${API_URL}/api/bookmarks`, {
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

export function useBookmarks(type: "all" | "archived" = "all") {
  let queryFn = type === "all" ? fetchBookmarks : fetchArchivedBookmarks;
  return useQuery({ queryKey: [type], queryFn: queryFn });
}

