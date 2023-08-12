import { DrawerNavigationHelpers } from "@react-navigation/drawer/lib/typescript/src/types";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NativeStackNavigationHelpers } from "@react-navigation/native-stack/lib/typescript/src/types";
import React from "react";
import {
  RefreshControl,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Appbar, FAB, useTheme } from "react-native-paper";
import { useBookmarks } from "../api/queries";
import { BookmarksList } from "../components/BookmarksList";
import { Loading } from "../components/Loading";
import { useRefresh } from "../hooks/useRefresh";
import { BookmarksType } from "../types";
import { AddBookmarkScreen } from "./AddBookmarkScreen";
import { SearchBookmarksScreen } from "./SearchBookmarksScreen";

interface BookmarksScreenProps {
  navigation: DrawerNavigationHelpers;
  type?: BookmarksType;
}

const Stack = createNativeStackNavigator();

export function BookmarksScreen({
  navigation,
  type = "all",
}: BookmarksScreenProps): JSX.Element {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="bookmarks">
        {props => (
          <BookmarksBody {...props} drawerNavigation={navigation} type={type} />
        )}
      </Stack.Screen>
      <Stack.Screen
        name="SearchBookmarksScreen"
        component={SearchBookmarksScreen}
      />
      <Stack.Group screenOptions={{ presentation: "modal" }}>
        <Stack.Screen name="AddBookmarkModal" component={AddBookmarkScreen} />
      </Stack.Group>
    </Stack.Navigator>
  );
}

interface BookmarksBodyProps {
  navigation: NativeStackNavigationHelpers;
  drawerNavigation: DrawerNavigationHelpers;
  type: BookmarksType;
}

function BookmarksBody({
  navigation,
  drawerNavigation,
  type,
}: BookmarksBodyProps) {
  const theme = useTheme();
  const { data: bookmarks, isFetched, isLoading, refetch } = useBookmarks(type);

  const { isRefreshing, onRefresh } = useRefresh({ callback: refetch });

  const hasBookmarks = isFetched && bookmarks && bookmarks.length > 0;
  const hasNoBookmarks = !hasBookmarks && isFetched;

  return (
    <>
      <StatusBar />
      <Appbar.Header style={{ backgroundColor: theme.colors.primaryContainer }}>
        <Appbar.Action icon="menu" onPress={drawerNavigation?.toggleDrawer} />
        <Appbar.Content title="Bookmarks" />
        <Appbar.Action
          icon="magnify"
          onPress={() => navigation.navigate("SearchBookmarksScreen")}
        />
      </Appbar.Header>
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
