import { Linking, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Bookmark } from "../types";

interface BookmarkProps {
  bookmark: Bookmark;
}

export function BookmarkItem({ bookmark }: BookmarkProps) {
  const handlePress = () => Linking.openURL(bookmark.url);

  return (
    <View>
      <Text style={styles.link} onPress={handlePress}>
        {displayBookmarkTitle(bookmark)}
      </Text>
    </View>
  );
}

function displayBookmarkTitle(bookmark: Bookmark) {
  if (bookmark.title) return bookmark.title;
  else if (bookmark?.website_title) return bookmark.website_title;
  return bookmark.url;
}

const styles = StyleSheet.create({
  link: {
    color: "#8f9aff",
    textAlign: "left",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderBottomWidth: 2,
    borderColor: "#333",
  },
});
