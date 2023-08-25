import React from "react";
import {
  Appbar,
  List,
  Portal,
  Text,
  TouchableRipple,
  useTheme,
  Dialog,
  Button,
  RadioButton,
} from "react-native-paper";
import {
  Appearance,
  StatusBar,
  StyleSheet,
  useColorScheme,
  View,
} from "react-native";

export function SettingsScreen({ navigation }) {
  const theme = useTheme();

  return (
    <>
      <StatusBar />
      <Appbar.Header style={{ backgroundColor: theme.colors.primaryContainer }}>
        <Appbar.BackAction onPress={navigation?.goBack} />
        <Appbar.Content title="Settings" />
      </Appbar.Header>
      <View
        style={{
          backgroundColor: theme.colors.background,
          ...styles.mainContainer,
        }}
      >
        <List.Section>
          <ThemeSettings />
          <TouchableRipple>
            <List.Item
              title="Logout"
              style={styles.listItem}
              left={props => <List.Icon {...props} icon="logout" />}
            />
          </TouchableRipple>
        </List.Section>
      </View>
    </>
  );
}

const themes = ["Light", "Dark", "System default"];

function ThemeSettings() {
  const [dialogVisible, setDialogVisible] = React.useState(false);
  const colorScheme = useColorScheme();

  console.log({ colorScheme });

  const toggleDialog = () => setDialogVisible(!dialogVisible);
  const handleChangeTheme = (value: string) => {
    if (value.includes("system")) Appearance.setColorScheme(null);
    else Appearance.setColorScheme(value);
  };

  return (
    <>
      <TouchableRipple onPress={toggleDialog}>
        <List.Item
          title="Theme"
          style={styles.listItem}
          left={props => <List.Icon {...props} icon="theme-light-dark" />}
        />
      </TouchableRipple>
      <Portal>
        <Dialog visible={dialogVisible} onDismiss={toggleDialog}>
          <Dialog.Content>
            <RadioButton.Group
              value={colorScheme}
              onValueChange={handleChangeTheme}
            >
              {themes.map((theme, i) => (
                <View key={i} style={styles.themeRadioContainer}>
                  <RadioButton value={theme.toLowerCase()} />
                  <Text>{theme}</Text>
                </View>
              ))}
            </RadioButton.Group>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={toggleDialog}>Done</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  listItem: {
    padding: 30,
  },
  themeRadioContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 9,
  },
});
