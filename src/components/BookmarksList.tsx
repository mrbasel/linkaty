import React from "react";
import { View } from "react-native";
import { Bookmark } from "../types";
import { BookmarkItem } from "./Bookmark";

interface BookmarksListProps {
  bookmarks: Bookmark[];
}

export function BookmarksList({ bookmarks }: BookmarksListProps): JSX.Element {
  return (
    <View>
      {bookmarks.map(bookmark => (
        <BookmarkItem key={bookmark.id} bookmark={bookmark} />
      ))}
    </View>
  );
}
