import { DrawerNavigationHelpers } from "@react-navigation/drawer/lib/typescript/src/types";
import React from "react";
import { BookmarksScreen } from "../screens/BookmarksScreen";

interface UntaggedBookmarksScreenProps {
  navigation?: DrawerNavigationHelpers;
}

export function UntaggedBookmarksScreen(
  props: UntaggedBookmarksScreenProps,
): JSX.Element {
  return <BookmarksScreen {...props} type="untagged" />;
}
