import { DrawerNavigationHelpers } from "@react-navigation/drawer/lib/typescript/src/types";
import React from "react";
import { BookmarksScreen } from "../screens/BookmarksScreen";

interface UnreadBookmarksScreenProps {
  navigation?: DrawerNavigationHelpers;
}

export function UnreadBookmarksScreen(
  props: UnreadBookmarksScreenProps,
): JSX.Element {
  return <BookmarksScreen {...props} type="unread" />;
}
