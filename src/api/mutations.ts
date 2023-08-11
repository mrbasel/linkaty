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
    body: JSON.stringify(preparePayload(payload)),
  });
  return response;
}

function preparePayload(payload: CreateBookmarkPayload) {
  const { url, title, description, tag_names } = payload;

  const preparedPayload: CreateBookmarkPayload = { url };
  if (title && title.trim().length > 0) preparedPayload.title = title;
  if (tag_names && tag_names?.filter(tag => tag.trim().length > 0).length > 0)
    preparedPayload.tag_names = tag_names;
  if (description && description.trim().length > 0)
    preparedPayload.description = description;

  return preparedPayload;
}

async function deleteBookmark(id: number) {
  const response = await fetch(`${API_URL}/api/bookmarks/${id}/`, {
    method: "DELETE",
    headers: {
      Authorization: `Token ${TOKEN}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
  console.log({response})
  return response;
}

export function useDeleteBookmark() {
  const queryClient = useQueryClient();
  return useMutation(deleteBookmark, {
    onSuccess: () => {
      queryClient.invalidateQueries(["bookmarks"]);
    },
  });
}

export function useCreateBookmark() {
  const queryClient = useQueryClient();
  return useMutation(createBookmark, {
    onSuccess: () => {
      queryClient.invalidateQueries(["bookmarks"]);
    },
  });
}
