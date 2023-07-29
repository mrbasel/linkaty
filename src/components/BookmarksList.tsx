import React from "react";
import { View } from "react-native";
import { Bookmark } from "../types";
import { BookmarkItem } from "./Bookmark";

const bookmarks: Bookmark[] = [];

export function BookmarksList(): JSX.Element {
  return (
    <View>
      {bookmarks.map(bookmark => (
        <BookmarkItem key={bookmark.id} bookmark={bookmark} />
      ))}
    </View>
  );
}
