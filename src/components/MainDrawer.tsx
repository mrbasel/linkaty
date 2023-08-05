import { StyleSheet, View } from "react-native";
import React from "react";
import { DrawerNavigationHelpers } from "@react-navigation/drawer/lib/typescript/src/types";
import { Divider, Drawer, useTheme } from "react-native-paper";

const bookmarkDrawerItems = ["All", "Archived", "Unread", "Untagged"];

interface MainDrawerProps {
  navigation?: DrawerNavigationHelpers;
  currentScreenIndex: number;
}

export function MainDrawer({
  navigation,
  currentScreenIndex,
}: MainDrawerProps) {
  const theme = useTheme();

  const handlePress = (name: string) => {
    navigation?.navigate(name);
  };
  return (
    <View
      style={{ ...styles.container, backgroundColor: theme.colors.background }}
    >
      <View>
        <Drawer.Section title="Bookmarks" showDivider={false}>
          {bookmarkDrawerItems.map((item, index) => (
            <Drawer.Item
              label={item}
              key={index}
              onPress={() => handlePress(item + "Bookmarks")}
              active={currentScreenIndex === index}
            />
          ))}
        </Drawer.Section>
        <View>
          <Divider />
          <Drawer.Item
            label="Tags"
            onPress={() => handlePress("Tags")}
            active={currentScreenIndex === 4}
          />
          <Divider />
        </View>
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
