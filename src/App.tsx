import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { PaperProvider } from "react-native-paper";
import { QueryClientProvider } from "@tanstack/react-query";
import { RootNavigator } from "./components/RootNavigator";
import { AuthContext } from "./contexts";
import { useAuth } from "./hooks/useAuth";
import { useColorScheme } from "react-native";
import { darkTheme, lightTheme } from "./themes";
import { queryClient } from "./queryClient";
import { ResourceProvider } from "./components/providors/ResourceProvider";

function App(): JSX.Element {
  const authObject = useAuth();
  const colorscheme = useColorScheme();

  return (
    <PaperProvider theme={colorscheme === "light" ? lightTheme : darkTheme}>
      <NavigationContainer>
        <AuthContext.Provider value={authObject}>
          <ResourceProvider>
            <QueryClientProvider client={queryClient}>
              <RootNavigator />
            </QueryClientProvider>
          </ResourceProvider>
        </AuthContext.Provider>
      </NavigationContainer>
    </PaperProvider>
  );
}

export default App;
