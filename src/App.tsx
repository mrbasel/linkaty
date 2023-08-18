import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import { PaperProvider } from "react-native-paper";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AuthScreen } from "./screens/AuthScreen";
import { MainScreen } from "./screens/MainScreen";
import { AddBookmarkScreen } from "./screens/AddBookmarkScreen";
import { SearchBookmarksScreen } from "./screens/SearchBookmarksScreen";

const Stack = createNativeStackNavigator();
const queryClient = new QueryClient();

function App(): JSX.Element {
  return (
    <PaperProvider>
      <NavigationContainer>
        <QueryClientProvider client={queryClient}>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Main" component={MainScreen} />
            <Stack.Screen name="Auth" component={AuthScreen} />
            <Stack.Screen
              name="SearchBookmarksScreen"
              component={SearchBookmarksScreen}
            />
            <Stack.Group screenOptions={{ presentation: "modal" }}>
              <Stack.Screen
                name="AddBookmarkModal"
                component={AddBookmarkScreen}
              />
            </Stack.Group>
          </Stack.Navigator>
        </QueryClientProvider>
      </NavigationContainer>
    </PaperProvider>
  );
}

export default App;
