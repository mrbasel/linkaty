import { Linking, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Bookmark } from "../types";
import { TouchableRipple, useTheme } from "react-native-paper";

interface BookmarkProps {
  bookmark: Bookmark;
}

export function BookmarkItem({ bookmark }: BookmarkProps) {
  const theme = useTheme();
  const handlePress = () => Linking.openURL(bookmark.url);

  const innerContainerPadding = bookmark.tag_names.length > 0 ? 10 : 0;

  return (
    <View style={styles.container}>
      <TouchableRipple onPress={handlePress}>
        <View
          style={{ padding: innerContainerPadding, ...styles.innerContainer }}
        >
          <Text style={styles.link}>{displayBookmarkTitle(bookmark)}</Text>
          <Text style={{ color: theme.colors.secondary }}>
            {displayBookmarkTags(bookmark.tag_names)}
          </Text>
        </View>
      </TouchableRipple>
    </View>
  );
}

function displayBookmarkTitle(bookmark: Bookmark) {
  if (bookmark.title) return bookmark.title;
  else if (bookmark?.website_title) return bookmark.website_title;
  return bookmark.url;
}

function displayBookmarkTags(tags: string[]) {
  const tagsWithHash = tags.map(tag => `#${tag}`);
  return tagsWithHash.join(" ");
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 5,
  },
  innerContainer: {
    paddingHorizontal: 10,
  },
  link: {
    color: "#8f9aff",
    textAlign: "left",
    fontWeight: "bold",
  },
});
