import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import { PaperProvider } from "react-native-paper";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RootNavigator } from "./components/RootNavigator";
import { AuthContext } from "./contexts";
import { useAuth } from "./hooks/useAuth";

const queryClient = new QueryClient();

function App(): JSX.Element {
  const authObject = useAuth();
  return (
    <PaperProvider>
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
