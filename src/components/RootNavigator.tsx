import React, { useContext } from "react";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useAuth } from "../hooks/useAuth";
import { AddBookmarkScreen } from "../screens/AddBookmarkScreen";
import { AuthScreen } from "../screens/AuthScreen";
import { MainScreen } from "../screens/MainScreen";
import { SearchBookmarksScreen } from "../screens/SearchBookmarksScreen";
import { SplashScreen } from "./SplashScreen";
import { AuthContext } from "../contexts";
import { AboutScreen } from "../screens/AboutScreen";

const Stack = createNativeStackNavigator();

export function RootNavigator() {
  const { isLoggedIn, isFetched } = useContext(AuthContext);

  if (!isFetched) return <SplashScreen />;

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {!isLoggedIn ? (
        <Stack.Screen name="Auth" component={AuthScreen} />
      ) : (
        <>
          <Stack.Screen name="Main" component={MainScreen} />
          <Stack.Screen
            name="SearchBookmarksScreen"
            component={SearchBookmarksScreen}
          />
          <Stack.Screen name="AboutScreen" component={AboutScreen} />
          <Stack.Group screenOptions={{ presentation: "modal" }}>
            <Stack.Screen
              name="AddBookmarkModal"
              component={AddBookmarkScreen}
            />
          </Stack.Group>
        </>
      )}
    </Stack.Navigator>
  );
}
