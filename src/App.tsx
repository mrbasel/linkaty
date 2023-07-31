import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import React from "react";
import { PaperProvider } from "react-native-paper";

import { BookmarksScreen } from "./screens/BookmarksScreen";
import { MainDrawer } from "./components/MainDrawer";

const Drawer = createDrawerNavigator();

function App(): JSX.Element {
  return (
    <PaperProvider>
      <NavigationContainer>
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
      </NavigationContainer>
    </PaperProvider>
  );
}

export default App;
