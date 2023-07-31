import { StyleSheet, View } from "react-native";
import React from "react";
import { DrawerNavigationHelpers } from "@react-navigation/drawer/lib/typescript/src/types";
import { Drawer, useTheme } from "react-native-paper";

interface MainDrawerProps {
  navigation?: DrawerNavigationHelpers;
}

export function MainDrawer({ navigation }: MainDrawerProps) {
  const theme = useTheme();
  return (
    <View
      style={{ ...styles.container, backgroundColor: theme.colors.background }}
    >
      <View>
        <Drawer.Section title="Bookmarks">
          <Drawer.Item label="All" />
          <Drawer.Item label="Archived" />
          <Drawer.Item label="Unread" />
          <Drawer.Item label="Untagged" />
        </Drawer.Section>
        <Drawer.Item label="Tags" />
      </View>
      <View>
        <Drawer.Item label="Settings" />
        <Drawer.Item label="About" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
  },
});
