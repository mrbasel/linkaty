import { DrawerNavigationHelpers } from "@react-navigation/drawer/lib/typescript/src/types";
import React from "react";
import {
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Appbar, FAB, useTheme } from "react-native-paper";
import { useBookmarks } from "../api/queries";
import { BookmarksList } from "../components/BookmarksList";
import { Header } from "../components/Header";
import { Loading } from "../components/Loading";
import { useRefresh } from "../hooks/useRefresh";
import { BookmarksType } from "../types";

interface BookmarksScreenProps {
  navigation: DrawerNavigationHelpers;
  type?: BookmarksType;
}

export function BookmarksScreen({
  navigation,
  type = "all",
}: BookmarksScreenProps): JSX.Element {
  const theme = useTheme();
  const { data: bookmarks, isFetched, isLoading, refetch } = useBookmarks(type);

  const { isRefreshing, onRefresh } = useRefresh({ callback: refetch });

  const hasBookmarks = isFetched && bookmarks && bookmarks.length > 0;
  const hasNoBookmarks = !hasBookmarks && isFetched;

  return (
    <>
      <Header>
        <Appbar.Action icon="menu" onPress={navigation?.toggleDrawer} />
        <Appbar.Content title="Bookmarks" />
        <Appbar.Action
          icon="magnify"
          onPress={() => navigation.navigate("SearchBookmarksScreen")}
        />
      </Header>
      <View
        style={{
          backgroundColor: theme.colors.background,
          ...styles.mainContainer,
        }}
      >
        {hasBookmarks && (
          <ScrollView
            contentInsetAdjustmentBehavior="automatic"
            refreshControl={
              <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
            }
          >
            <BookmarksList bookmarks={bookmarks ?? []} />
          </ScrollView>
        )}

        {isLoading && <Loading />}
        {hasNoBookmarks && <Text>No bookmarks here!</Text>}
      </View>
      <FAB
        icon="plus"
        style={styles.fab}
        onPress={() => navigation?.navigate("AddBookmarkModal")}
      />
    </>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
  },
});
