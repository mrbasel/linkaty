import {
  Bookmark,
  BookmarksType,
  CreateBookmarkPayload,
  Resource,
  Tag,
} from "../types";

import { QuickSQLiteConnection } from "react-native-quick-sqlite";

const createBookmarkTableSQL = `
  CREATE TABLE IF NOT EXISTS bookmarks (
    id INTEGER PRIMARY KEY,
    url TEXT NOT NULL,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    notes TEXT NOT NULL,
    website_title TEXT,
    website_description TEXT,
    is_archived BOOLEAN,
    unread BOOLEAN,
    shared BOOLEAN,
    date_added TEXT NOT NULL,
    date_modified TEXT NOT NULL
  );
`;

const createTagTableSQL = `
  CREATE TABLE IF NOT EXISTS tags (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    date_added TEXT NOT NULL
  );
`;

const createBookmarkTagTableSQL = `
  CREATE TABLE IF NOT EXISTS bookmark_tags (
    bookmark_id INTEGER,
    tag_id INTEGER,
    FOREIGN KEY (bookmark_id) REFERENCES bookmarks(id),
    FOREIGN KEY (tag_id) REFERENCES tags(id)
  );
`;

export class LocalResource implements Resource {
  db: QuickSQLiteConnection;
  constructor(db: QuickSQLiteConnection) {
    this.db = db;
    db.execute(createBookmarkTableSQL);
    db.execute(createTagTableSQL);
    db.execute(createBookmarkTagTableSQL);
  }
  async getBookmarks(type: BookmarksType, query?: string | undefined) {
    let rows: Bookmark[] = [];
    if (type === "unread") {
      const result = await this.db.executeAsync(
        "SELECT * FROM bookmarks where unread = TRUE",
      );
      rows = result.rows?._array as Bookmark[];
    } else if (type === "archived") {
      const result = await this.db.executeAsync(
        "SELECT * FROM bookmarks where is_archived = TRUE",
      );
      rows = result.rows?._array as Bookmark[];
    } else if (type === "untagged") {
      const result = await this.db.executeAsync(
        "SELECT * FROM bookmarks inner join bookmark_tags on bookmarks.id = bookmark_tags.bookmark_id where bookmark_tags.tag_id is NULL",
      );
      rows = result.rows?._array as Bookmark[];
    } else {
      const result = await this.db.executeAsync("SELECT * FROM bookmarks");
      rows = result.rows?._array as Bookmark[];
    }

    return rows;
  }
  async getArchivedBookmarks() {
    const result = await this.db.executeAsync(
      "SELECT * FROM bookmarks where is_archived = TRUE",
    );
    return result.rows?._array as Bookmark[];
  }
  async createBookmark(payload: CreateBookmarkPayload) {
    const { url, title, description, notes, is_archived, unread, shared } =
      payload;
    this.db.executeAsync(
      `INSERT INTO bookmarks (url, title, description, notes, website_title, website_description, is_archived, unread, shared, date_added, date_modified) VALUES ("${url}", "${title}", "${description}", "${notes}", "${is_archived}", "${unread}", "${shared}")`,
    );
  }
  async deleteBookmark(bookmark: Bookmark) {
    this.db.executeAsync(`DELETE FROM bookmarks WHERE id = ${bookmark.id}`);
  }
  async getTags() {
    const result = await this.db.executeAsync("SELECT * FROM bookmarks");
    return result.rows?._array as Tag[];
  }
}
