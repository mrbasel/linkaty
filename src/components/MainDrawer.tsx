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
        <Drawer.Item label="About" onPress={() => handlePress("AboutScreen")} />
        <LogoutDialogItem />
      </View>
    </View>
  );
}

function LogoutDialogItem() {
  const [visible, setVisible] = React.useState(false);
  const { setConfig } = useContext(AuthContext);

  const handleLogout = () => {
    setConfig({ apiToken: "", serverUrl: "" });
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
