import { useQuery } from "@tanstack/react-query";
import { useResourseContext } from "../hooks/useResourse";
import { BookmarksType } from "../types";

export function useBookmarks(type: BookmarksType, query?: string) {
  const resource = useResourseContext();
  let queryFn =
    type === "archived"
      ? resource.getArchivedBookmarks
      : () => resource.getBookmarks(type, query);

  return useQuery({
    queryKey: ["bookmarks", type, query].filter(String),
    queryFn: queryFn,
  });
}

export function useTags() {
  const resource = useResourseContext();
  return useQuery({ queryKey: ["tags"], queryFn: resource.getTags });
}
