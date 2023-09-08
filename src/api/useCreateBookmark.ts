import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useResourseContext } from "../hooks/useResourse";

export function useCreateBookmark() {
  const resource = useResourseContext();
  const queryClient = useQueryClient();

  return useMutation(resource.createBookmark, {
    onSuccess: () => {
      queryClient.invalidateQueries(["bookmarks"]);
    },
  });
}

export function useDeleteBookmark() {
  const resource = useResourseContext();
  const queryClient = useQueryClient();

  return useMutation(resource.deleteBookmark, {
    onSuccess: () => {
      queryClient.invalidateQueries(["bookmarks"]);
    },
  });
}
