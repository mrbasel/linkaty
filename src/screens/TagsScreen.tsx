import { DrawerNavigationHelpers } from "@react-navigation/drawer/lib/typescript/src/types";
import React from "react";
import { ScrollView } from "react-native-gesture-handler";
import { Appbar, Chip, useTheme } from "react-native-paper";
import { StatusBar, StyleSheet, View } from "react-native";
import { BookmarksList } from "../components/BookmarksList";
import { useTags } from "../api/queries";

interface TagsScreenProps {
  navigation?: DrawerNavigationHelpers;
}

export function TagsScreen({ navigation }: TagsScreenProps): JSX.Element {
  const theme = useTheme();
  const { data: tags } = useTags();
  return (
    <>
      <StatusBar />
      <Appbar.Header style={{ backgroundColor: theme.colors.primaryContainer }}>
        <Appbar.Action icon="menu" onPress={navigation?.toggleDrawer} />
        <Appbar.Content title="Tags" />
        <Appbar.Action icon="magnify" onPress={() => {}} />
      </Appbar.Header>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={{ backgroundColor: theme.colors.background }}
      >
        <View style={styles.tagsContainer}>
          {tags?.map(tag => (
            <Chip key={tag.id}>#{tag.name}</Chip>
          ))}
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  tagsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
    gap: 8,
    paddingVertical: 12,
    paddingHorizontal: 6,
  },
});
