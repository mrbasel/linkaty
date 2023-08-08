import { Linking, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Bookmark } from "../types";
import {
  IconButton,
  Menu,
  TouchableRipple,
  useTheme,
} from "react-native-paper";

interface BookmarkProps {
  bookmark: Bookmark;
}

export function BookmarkItem({ bookmark }: BookmarkProps) {
  const theme = useTheme();
  const handlePress = () => Linking.openURL(bookmark.url);
  const [visible, setVisible] = React.useState(false);

  const innerContainerPadding = bookmark.tag_names.length > 0 ? 10 : 0;

  return (
    <View style={styles.container}>
      <TouchableRipple onPress={handlePress}>
        <View
          style={{ padding: innerContainerPadding, ...styles.innerContainer }}
        >
          <View>
            <Text style={styles.link}>{displayBookmarkTitle(bookmark)}</Text>
            <Text style={{ color: theme.colors.secondary }}>
              {displayBookmarkTags(bookmark.tag_names)}
            </Text>
          </View>
          <Menu
            visible={visible}
            onDismiss={() => setVisible(false)}
            anchor={
              <IconButton
                style={styles.optionsButton}
                icon="dots-vertical"
                size={25}
                onPress={() => setVisible(true)}
              />
            }
          >
            <Menu.Item title="Copy" />
            <Menu.Item title="Edit" />
            <Menu.Item title="Delete" />
          </Menu>
        </View>
      </TouchableRipple>
    </View>
  );
}

const MAX_LENGTH = 40;

function displayBookmarkTitle(bookmark: Bookmark) {
  let stringToDisplay = "";
  if (bookmark.title) stringToDisplay = bookmark.title;
  else if (bookmark?.website_title) stringToDisplay = bookmark.website_title;
  else stringToDisplay = bookmark.url;

  if (stringToDisplay.length > MAX_LENGTH)
    return stringToDisplay.slice(0, MAX_LENGTH - 3) + "...";
  return stringToDisplay;
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
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
  },
  link: {
    color: "#8f9aff",
    textAlign: "left",
    fontWeight: "bold",
  },
  optionsButton: {},
});
