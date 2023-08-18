import React, { useCallback } from "react";
import {
  createDrawerNavigator,
  DrawerContentComponentProps,
} from "@react-navigation/drawer";
import { MainDrawer } from "../components/MainDrawer";
import { ArchivedBookmarksScreen } from "./ArchivedBookmarksScreen";
import { BookmarksScreen } from "./BookmarksScreen";
import { TagsScreen } from "./TagsScreen";
import { UnreadBookmarksScreen } from "./UnreadBookmarksScreen";
import { UntaggedBookmarksScreen } from "./UntaggedBookmarksScreen";

const Drawer = createDrawerNavigator();

export function MainScreen() {
  const drawerContent = useCallback(
    ({ navigation: drawerNavigation, state }: DrawerContentComponentProps) => (
      <MainDrawer
        navigation={drawerNavigation}
        currentScreenIndex={state.index}
      />
    ),
    [],
  );
  return (
    <Drawer.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="Home"
      drawerContent={drawerContent}
    >
      <Drawer.Group>
        <Drawer.Screen name="AllBookmarks" component={BookmarksScreen} />
        <Drawer.Screen
          name="ArchivedBookmarks"
          component={ArchivedBookmarksScreen}
        />
        <Drawer.Screen
          name="UnreadBookmarks"
          component={UnreadBookmarksScreen}
        />
        <Drawer.Screen
          name="UntaggedBookmarks"
          component={UntaggedBookmarksScreen}
        />
      </Drawer.Group>
      <Drawer.Screen name="Tags" component={TagsScreen} />
    </Drawer.Navigator>
  );
}
