import { DrawerNavigationHelpers } from "@react-navigation/drawer/lib/typescript/src/types";
import React from "react";
import { ScrollView, StatusBar, StyleSheet, Text, View } from "react-native";
import { Appbar, useTheme } from "react-native-paper";
import { useBookmarks } from "../api/queries";
import { BookmarksList } from "../components/BookmarksList";
import { Loading } from "../components/Loading";
import { BookmarksType } from "../types";

interface BookmarksScreenProps {
  navigation?: DrawerNavigationHelpers;
  type?: BookmarksType;
}

export function BookmarksScreen({
  navigation,
  type = "all",
}: BookmarksScreenProps): JSX.Element {
  const theme = useTheme();
  const { data: bookmarks, isFetched, isLoading } = useBookmarks(type);

  const hasBookmarks = isFetched && bookmarks && bookmarks.length > 0;
  const hasNoBookmarks = !hasBookmarks && isFetched;

  return (
    <>
      <StatusBar />
      <Appbar.Header style={{ backgroundColor: theme.colors.primaryContainer }}>
        <Appbar.Action icon="menu" onPress={navigation?.toggleDrawer} />
        <Appbar.Content title="Bookmarks" />
        <Appbar.Action icon="magnify" onPress={() => {}} />
      </Appbar.Header>
      <View
        style={{
          backgroundColor: theme.colors.background,
          ...styles.mainContainer,
        }}
      >
        {hasBookmarks && (
          <ScrollView contentInsetAdjustmentBehavior="automatic">
            <BookmarksList bookmarks={bookmarks ?? []} />
          </ScrollView>
        )}

        {isLoading && <Loading />}
        {hasNoBookmarks && <Text>No bookmarks here!</Text>}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
