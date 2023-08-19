import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getApiConfig } from "../utils";

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
  const apiConfig = await getApiConfig();
  const response = await fetch(`${apiConfig.serverUrl}/api/bookmarks/`, {
    method: "POST",
    headers: {
      Authorization: `Token ${apiConfig.apiToken}`,
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
  const apiConfig = await getApiConfig();
  const response = await fetch(`${apiConfig.serverUrl}/api/bookmarks/${id}/`, {
    method: "DELETE",
    headers: {
      Authorization: `Token ${apiConfig.apiToken}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
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
