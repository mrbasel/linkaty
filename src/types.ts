export interface Bookmark {
  id: number;
  url: string;
  title: string;
  description: string;
  notes: string;
  website_title: string | null;
  website_description: string | null;
  is_archived: boolean;
  unread: boolean;
  shared: boolean;
  tag_names: string[];
  date_added: string;
  date_modified: string;
}

export interface Tag {
  id: number;
  name: string;
  date_added: string;
}

export type BookmarksType = "all" | "unread" | "archived" | "untagged";

export interface ApiConfig {
  serverUrl: string;
  apiToken: string;
}

export interface CreateBookmarkPayload {
  url: string;
  title?: string;
  description?: string;
  notes?: string;
  is_archived?: boolean;
  unread?: boolean;
  shared?: boolean;
  tag_names?: string[];
}

export interface Resource {
  getBookmarks: (type: BookmarksType, query?: string) => Promise<Bookmark[]>;
  getArchivedBookmarks: () => Promise<Bookmark[]>;
  createBookmark: (payload: CreateBookmarkPayload) => Promise<void>;
  // updateBookmark: (bookmark: Bookmark) => Promise<Bookmark>;
  deleteBookmark: (bookmark: Bookmark) => Promise<void>;
  getTags: () => Promise<Tag[]>;
}
