import { QueryClient, QueryCache } from "@tanstack/react-query";
import { ToastAndroid } from "react-native";

export const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: error => {
      if (error instanceof Error)
        ToastAndroid.show(`Error occured: ${error.message}`, ToastAndroid.LONG);
    },
  }),
});
