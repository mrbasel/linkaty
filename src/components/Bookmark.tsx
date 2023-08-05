import { Linking, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Bookmark } from "../types";
import { TouchableRipple } from "react-native-paper";

interface BookmarkProps {
  bookmark: Bookmark;
}

export function BookmarkItem({ bookmark }: BookmarkProps) {
  const handlePress = () => Linking.openURL(bookmark.url);

  return (
    <View>
      <TouchableRipple onPress={handlePress}>
        <Text style={styles.link}>{displayBookmarkTitle(bookmark)}</Text>
      </TouchableRipple>
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
