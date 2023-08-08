import { API_URL, TOKEN } from "@env";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface CreateBookmarkPayload {
  url: string;
  title?: string;
  description?: string;
  notes?: string;
  is_archived?: boolean;
  unread?: boolean;
  shared?: boolean;
  tag_names?: string[];
}

export async function createBookmark(payload: CreateBookmarkPayload) {
  const response = await fetch(`${API_URL}/api/bookmarks/`, {
    method: "POST",
    headers: {
      Authorization: `Token ${TOKEN}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  console.log(response.status);
  console.log(await response.json());
  return response;
}

export function useCreateBookmark() {
  const queryClient = useQueryClient();
  return useMutation(createBookmark, {
    onSuccess: () => {
      queryClient.invalidateQueries(["bookmarks"]);
    },
  });
}
