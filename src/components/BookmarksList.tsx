import React from "react";
import { Text, StyleSheet } from "react-native";
import { Bookmark } from "../types";
import { BookmarkItem } from "./Bookmark";

const bookmarks: Bookmark[] = [];

export function BookmarksList(): JSX.Element {
  return (
    <>
      <Text style={styles.title}>Bookmarks</Text>
      {bookmarks.map(bookmark => (
        <BookmarkItem key={bookmark.id} bookmark={bookmark} />
      ))}
    </>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
  },
  linksContainer: {
    textAlign: "left",
  },
  link: {
    color: "#8f9aff",
    textAlign: "left",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderBottomWidth: 2,
    borderColor: "#333",
  },
});
