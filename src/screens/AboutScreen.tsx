import { getVersion } from "react-native-device-info";
import React from "react";
import { Appbar, List, TouchableRipple, useTheme } from "react-native-paper";
import { Linking, StyleSheet, View } from "react-native";
import { NativeStackNavigationHelpers } from "@react-navigation/native-stack/lib/typescript/src/types";
import { Header } from "../components/Header";

interface ListItem {
  title: string;
  description?: string;
  href?: string;
}

const listItems: ListItem[] = [
  { title: "Version", description: getVersion() },
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
      <Header>
        <Appbar.BackAction onPress={navigation?.goBack} />
        <Appbar.Content title="About" />
      </Header>
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
