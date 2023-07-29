import { DrawerNavigationHelpers } from "@react-navigation/drawer/lib/typescript/src/types";
import React from "react";
import { ScrollView, StatusBar } from "react-native";
import { Appbar } from "react-native-paper";
import { BookmarksList } from "../components/BookmarksList";

interface BookmarksScreenProps {
  navigation?: DrawerNavigationHelpers;
}

export function BookmarksScreen({
  navigation,
}: BookmarksScreenProps): JSX.Element {
  return (
    <>
      <StatusBar />
      <Appbar.Header>
        <Appbar.Action icon="menu" onPress={navigation?.toggleDrawer} />
        <Appbar.Content title="Bookmarks" />
        <Appbar.Action icon="magnify" onPress={() => {}} />
      </Appbar.Header>
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <BookmarksList />
      </ScrollView>
    </>
  );
}
