import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import React from "react";
import { PaperProvider } from "react-native-paper";

import { BookmarksScreen } from "./screens/BookmarksScreen";
import { MainDrawer } from "./components/MainDrawer";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ArchivedBookmarksScreen } from "./screens/ArchivedBookmarksScreen";
import { UnreadBookmarksScreen } from "./screens/UnreadBookmarksScreen";
import { UntaggedBookmarksScreen } from "./screens/UntaggedBookmarksScreen";
import { TagsScreen } from "./screens/TagsScreen";
import { BookmarksScreensGroup } from "./screens/BookmarkScreensGroup";

export const Drawer = createDrawerNavigator();
const queryClient = new QueryClient();

function App(): JSX.Element {
  return (
    <PaperProvider>
      <NavigationContainer>
        <QueryClientProvider client={queryClient}>
          <Drawer.Navigator
            screenOptions={{ headerShown: false }}
            initialRouteName="Home"
            drawerContent={({ navigation, state }) => (
              <MainDrawer
                navigation={navigation}
                currentScreenIndex={state.index}
              />
            )}
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
        </QueryClientProvider>
      </NavigationContainer>
    </PaperProvider>
  );
}

export default App;
