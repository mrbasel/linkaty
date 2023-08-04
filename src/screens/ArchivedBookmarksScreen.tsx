import { DrawerNavigationHelpers } from "@react-navigation/drawer/lib/typescript/src/types";
import React from "react";
import { BookmarksScreen } from "../screens/BookmarksScreen";

interface ArchivedBookmarksScreenProps {
  navigation?: DrawerNavigationHelpers;
}

export function ArchivedBookmarksScreen(
  props: ArchivedBookmarksScreenProps,
): JSX.Element {
  return <BookmarksScreen {...props} type="archived" />;
}
