import React from "react";
import { Appbar, List, TouchableRipple, useTheme } from "react-native-paper";
import { Linking, StatusBar, StyleSheet, View } from "react-native";
import { NativeStackNavigationHelpers } from "@react-navigation/native-stack/lib/typescript/src/types";

interface ListItem {
  title: string;
  description?: string;
  href?: string;
}

const listItems: ListItem[] = [
  { title: "Version", description: "0.0.0" },
  {
    title: "Author",
    description: "Basel Al Nassr",
    href: "https://baselalnassr.com",
  },
  { title: "Source code", href: "https://github.com" },
  { title: "Leave feedback", href: "https://github.com" },
];

export function AboutScreen({
  navigation,
}: {
  navigation: NativeStackNavigationHelpers;
}) {
  const theme = useTheme();

  const handleItemPress = (item: ListItem) => {
    if (item.href) Linking.openURL(item.href);
  };

  return (
    <>
      <StatusBar />
      <Appbar.Header style={{ backgroundColor: theme.colors.primaryContainer }}>
        <Appbar.BackAction onPress={navigation?.goBack} />
        <Appbar.Content title="About" />
      </Appbar.Header>
      <View
        style={{
          backgroundColor: theme.colors.background,
          ...styles.mainContainer,
        }}
      >
        <List.Section style={styles.list}>
          {listItems.map((item, index) => (
            <TouchableRipple key={index} onPress={() => handleItemPress(item)}>
              <List.Item
                title={item.title}
                description={item.description}
                style={styles.listItem}
              />
            </TouchableRipple>
          ))}
        </List.Section>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  list: {},
  listItem: {
    padding: 30,
  },
});
