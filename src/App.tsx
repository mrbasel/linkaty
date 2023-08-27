import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { PaperProvider } from "react-native-paper";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RootNavigator } from "./components/RootNavigator";
import { AuthContext } from "./contexts";
import { useAuth } from "./hooks/useAuth";
import { useColorScheme } from "react-native";
import { darkTheme, lightTheme } from "./themes";

const queryClient = new QueryClient();

function App(): JSX.Element {
  const authObject = useAuth();
  const colorscheme = useColorScheme();
  return (
    <PaperProvider theme={colorscheme === "light" ? lightTheme : darkTheme}>
      <NavigationContainer>
        <AuthContext.Provider value={authObject}>
          <QueryClientProvider client={queryClient}>
            <RootNavigator />
          </QueryClientProvider>
        </AuthContext.Provider>
      </NavigationContainer>
    </PaperProvider>
  );
}

export default App;
