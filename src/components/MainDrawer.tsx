import { StyleSheet, View } from "react-native";
import React, { useContext } from "react";
import { DrawerNavigationHelpers } from "@react-navigation/drawer/lib/typescript/src/types";
import {
  Button,
  Dialog,
  Divider,
  Drawer,
  Portal,
  Text,
  useTheme,
} from "react-native-paper";
import { AuthContext } from "../contexts";
import { useQueryClient } from "@tanstack/react-query";
import { useBookmarks, useTags } from "../api/queries";
import { getMostUsedTags } from "../utils";

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

  const { data: bookmarks } = useBookmarks("all");

  const handlePress = (name: string) => {
    navigation?.navigate(name);
  };

  const handleTagPress = (name: string) => {
    navigation?.navigate("SearchBookmarksScreen", {
      query: `#${name}`,
    });
  };

  return (
    <View
      style={{ ...styles.container, backgroundColor: theme.colors.background }}
    >
      <View>
        <Drawer.Section title="Bookmarks">
          {bookmarkDrawerItems.map((item, index) => (
            <Drawer.Item
              label={item}
              key={index}
              onPress={() => handlePress(item + "Bookmarks")}
              active={currentScreenIndex === index}
            />
          ))}
        </Drawer.Section>
        <Drawer.Section title="Tags">
          <Drawer.Item
            label="All"
            onPress={() => handlePress("Tags")}
            active={currentScreenIndex === 4}
          />
          {getMostUsedTags(bookmarks ?? [])?.map(tag => (
            <Drawer.Item
              label={`#${tag}`}
              onPress={() => handleTagPress(tag)}
            />
          ))}
        </Drawer.Section>
      </View>
      <View>
        <Drawer.Item label="About" onPress={() => handlePress("AboutScreen")} />
        <LogoutDialogItem />
      </View>
    </View>
  );
}

function LogoutDialogItem() {
  const [visible, setVisible] = React.useState(false);
  const { setConfig } = useContext(AuthContext);
  const queryClient = useQueryClient();

  const handleLogout = () => {
    setConfig({ apiToken: "", serverUrl: "" });
    queryClient.clear();
  };

  const toggleDialog = () => {
    setVisible(!visible);
  };

  return (
    <>
      <Drawer.Item label="Logout" onPress={toggleDialog} />
      <Portal>
        <Dialog visible={visible} onDismiss={toggleDialog}>
          <Dialog.Content>
            <Text variant="bodyMedium">Are you sure you want to logout?</Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={toggleDialog}>Close</Button>
            <Button onPress={handleLogout}>Logout</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
  },
});
