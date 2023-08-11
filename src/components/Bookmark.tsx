import { Linking, StyleSheet, Text, ToastAndroid, View } from "react-native";
import React from "react";
import { Bookmark } from "../types";
import {
  IconButton,
  Menu,
  TouchableRipple,
  useTheme,
} from "react-native-paper";
import Clipboard from "@react-native-clipboard/clipboard";
import { DeleteBookmarkDialog } from "./DeleteBookmarkDialog";

interface BookmarkProps {
  bookmark: Bookmark;
}

export function BookmarkItem({ bookmark }: BookmarkProps) {
  const theme = useTheme();
  const [visible, setVisible] = React.useState(false);
  const [deleteDialogVisible, setDeleteDialogVisible] = React.useState(false);

  const innerContainerPadding = bookmark.tag_names.length > 0 ? 10 : 0;

  const handlePress = () => Linking.openURL(bookmark.url);

  const onCopy = () => {
    Clipboard.setString(bookmark.url);
    setVisible(false);
    ToastAndroid.show("URL copied to clipboard", ToastAndroid.SHORT);
  };

  const onDelete = () => {
    setVisible(false);
    setDeleteDialogVisible(true);
  };

  const onCloseDeleteDialog = () => {
    setDeleteDialogVisible(false);
  };

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
            <Menu.Item title="Copy" onPress={onCopy} />
            <Menu.Item title="Delete" onPress={onDelete} />
          </Menu>
        </View>
      </TouchableRipple>
      <DeleteBookmarkDialog
        bookmarkId={bookmark.id}
        visible={deleteDialogVisible}
        onDismiss={onCloseDeleteDialog}
      />
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
