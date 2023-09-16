import {
  ApiConfig,
  Bookmark,
  BookmarksType,
  CreateBookmarkPayload,
  Resource,
} from "../types";
import { responseHandler } from "../utils";

export class LinkdingResource implements Resource {
  serverUrl: string;
  apiToken: string;

  constructor(apiConfig: ApiConfig) {
    this.serverUrl = apiConfig.serverUrl;
    this.apiToken = apiConfig.apiToken;
  }

  static constructQuery(baseUrl: string, type: BookmarksType, query?: string) {
    let q = "";
    const url = new URL(`${baseUrl}/api/bookmarks`);
    if (type !== "all") q = `!${type}`;
    if (type !== "all" && query) q = `${q}+${query.replace(" ", "+")}`.trim();
    if (type === "all" && query) q = `${query}`.trim();
    if (q) url.searchParams.append("q", q);
    return url.href;
  }

  static prepareBookmarkPayload(payload: CreateBookmarkPayload) {
    const { url, title, description, tag_names } = payload;

    const preparedPayload: CreateBookmarkPayload = { url };
    if (title && title.trim().length > 0) preparedPayload.title = title;
    if (tag_names && tag_names?.filter(tag => tag.trim().length > 0).length > 0)
      preparedPayload.tag_names = tag_names;
    if (description && description.trim().length > 0)
      preparedPayload.description = description;

    return preparedPayload;
  }

  getArchivedBookmarks = async () => {
    const data = await fetch(`${this.serverUrl}/api/bookmarks/archived`, {
      headers: {
        Authorization: `Token ${this.apiToken}`,
      },
    }).then(responseHandler);
    return data?.results ?? [];
  };

  getBookmarks = async (type: BookmarksType, query?: string) => {
    const url = LinkdingResource.constructQuery(this.serverUrl, type, query);

    const data = await fetch(url, {
      headers: {
        Authorization: `Token ${this.apiToken}`,
      },
    }).then(responseHandler);
    return data?.results ?? [];
  };

  createBookmark = (payload: CreateBookmarkPayload) => {
    const data = fetch(`${this.serverUrl}/api/bookmarks/`, {
      method: "POST",
      headers: {
        Authorization: `Token ${this.apiToken}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(LinkdingResource.prepareBookmarkPayload(payload)),
    }).then(responseHandler);
    return data;
  };

  deleteBookmark = async (bookmark: Bookmark) => {
    const id = bookmark.id;
    const data = await fetch(`${this.serverUrl}/api/bookmarks/${id}/`, {
      method: "DELETE",
      headers: {
        Authorization: `Token ${this.apiToken}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }).then(responseHandler);
    return data;
  };
  getTags = async () => {
    const data = await fetch(`${this.serverUrl}/api/tags/`, {
      headers: {
        Authorization: `Token ${this.apiToken}`,
      },
    }).then(responseHandler);
    return data?.results ?? [];
  };
}
