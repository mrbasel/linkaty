import React, { useState } from "react";
import { Appbar, useTheme } from "react-native-paper";
import {
  StatusBar,
  StyleSheet,
  Text,
  View,
  TextInput,
  RefreshControl,
  FlatList,
} from "react-native";
import { useBookmarks } from "../api/queries";
import { useRefresh } from "../hooks/useRefresh";
import { NativeStackNavigationHelpers } from "@react-navigation/native-stack/lib/typescript/src/types";
import { Loading } from "../components/Loading";
import { useDebounce } from "../hooks/useDebounce";
import { BookmarkItem } from "../components/BookmarkItem";

interface SearchBookmarksScreenProps {
  navigation: NativeStackNavigationHelpers;
  route: any;
}

export function SearchBookmarksScreen({
  navigation,
  route,
}: SearchBookmarksScreenProps) {
  const [searchQuery, setSearchQuery] = useState(() => {
    if (route.params?.query) {
      return route.params.query;
    }
    return "";
  });
  const debouncedSearchQuery = useDebounce(searchQuery, 250);
  const {
    data: bookmarks,
    isFetched,
    isLoading,
    refetch,
  } = useBookmarks("all", debouncedSearchQuery);
  const { isRefreshing, onRefresh } = useRefresh({ callback: refetch });
  const theme = useTheme();

  const hasResults = isFetched && bookmarks && bookmarks?.length > 0;
  const noResults = !isLoading && !hasResults;

  return (
    <>
      <StatusBar />
      <Appbar.Header style={{ backgroundColor: theme.colors.primaryContainer }}>
        <Appbar.BackAction onPress={navigation?.goBack} />
        <TextInput
          placeholder="Search"
          autoFocus={true}
          value={searchQuery}
          onChangeText={query => setSearchQuery(query)}
          style={{
            backgroundColor: theme.colors.primaryContainer,
            ...styles.searchBar,
          }}
        />
      </Appbar.Header>
      <View
        style={{
          backgroundColor: theme.colors.background,
          ...styles.mainContainer,
        }}
      >
        {isLoading && <Loading />}
        {noResults && <Text>No results.</Text>}
        {hasResults && (
          <FlatList
            data={bookmarks}
            keyExtractor={bookmark => bookmark.id.toString()}
            refreshControl={
              <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
            }
            renderItem={({ item: bookmark }) => (
              <BookmarkItem key={bookmark.id} bookmark={bookmark} />
            )}
          />
        )}
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
  searchBar: {
    flex: 1,
  },
});
