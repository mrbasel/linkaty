import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import React from "react";
import { PaperProvider } from "react-native-paper";

import { BookmarksScreen } from "./screens/BookmarksScreen";
import { MainDrawer } from "./components/MainDrawer";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const Drawer = createDrawerNavigator();
const queryClient = new QueryClient();

function App(): JSX.Element {
  return (
    <PaperProvider>
      <NavigationContainer>
        <QueryClientProvider client={queryClient}>
          <Drawer.Navigator
            screenOptions={{ headerShown: false }}
            initialRouteName="Home"
            drawerContent={({ navigation }) => (
              <MainDrawer navigation={navigation} />
            )}
          >
            <Drawer.Screen name="Home" component={BookmarksScreen} />
            <Drawer.Screen name="Notifications" component={BookmarksScreen} />
          </Drawer.Navigator>
        </QueryClientProvider>
      </NavigationContainer>
    </PaperProvider>
  );
}

export default App;
