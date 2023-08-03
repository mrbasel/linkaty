import { DrawerNavigationHelpers } from "@react-navigation/drawer/lib/typescript/src/types";
import React from "react";
import { ScrollView, StatusBar } from "react-native";
import { Appbar, useTheme } from "react-native-paper";
import { useBookmarks } from "../api/queries";
import { BookmarksList } from "../components/BookmarksList";

interface BookmarksScreenProps {
  navigation?: DrawerNavigationHelpers;
}

export function BookmarksScreen({
  navigation,
}: BookmarksScreenProps): JSX.Element {
  const theme = useTheme();
  const { data: bookmarks } = useBookmarks();

  return (
    <>
      <StatusBar />
      <Appbar.Header style={{ backgroundColor: theme.colors.primaryContainer }}>
        <Appbar.Action icon="menu" onPress={navigation?.toggleDrawer} />
        <Appbar.Content title="Bookmarks" />
        <Appbar.Action icon="magnify" onPress={() => {}} />
      </Appbar.Header>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={{ backgroundColor: theme.colors.background }}
      >
        <BookmarksList bookmarks={bookmarks ?? []} />
      </ScrollView>
    </>
  );
}
