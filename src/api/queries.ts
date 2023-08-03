import { API_URL, TOKEN } from "@env";
// import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Bookmark } from "../types";

console.log(API_URL, TOKEN)

async function fetchBookmarks(): Promise<Bookmark[]> {
  const response = await fetch(`${API_URL}/api/bookmarks`, {
    headers: {
      Authorization: `Token ${TOKEN}`,
    },
  });
  const data = await response.json();
  return data?.results ?? [];
}

export function useBookmarks() {
  return useQuery({ queryKey: ["bookmarks"], queryFn: fetchBookmarks });
}
