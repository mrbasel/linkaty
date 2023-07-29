import React from "react";
import {
  ScrollView,
  StatusBar,
} from "react-native";
import { Appbar, PaperProvider } from "react-native-paper";

import { BookmarksList } from "./components/BookmarksList";

function App(): JSX.Element {
  return (
    <PaperProvider>
      <>
        <StatusBar />
        <Appbar.Header>
          <Appbar.Action icon="menu" onPress={() => console.log("menu")} />
          <Appbar.Content title="Bookmarks" />
          <Appbar.Action icon="magnify" onPress={() => {}} />
        </Appbar.Header>
        <ScrollView contentInsetAdjustmentBehavior="automatic">
          <BookmarksList />
        </ScrollView>
      </>
    </PaperProvider>
  );
}

export default App;
