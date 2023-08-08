import { DrawerNavigationHelpers } from "@react-navigation/drawer/lib/typescript/src/types";
import React from "react";
import { ScrollView } from "react-native-gesture-handler";
import { Appbar, Chip, useTheme } from "react-native-paper";
import {
  StatusBar,
  StyleSheet,
  View,
  Text,
  RefreshControl,
} from "react-native";
import { useTags } from "../api/queries";
import { Loading } from "../components/Loading";
import { useRefresh } from "../hooks/useRefresh";

interface TagsScreenProps {
  navigation?: DrawerNavigationHelpers;
}

export function TagsScreen({ navigation }: TagsScreenProps): JSX.Element {
  const theme = useTheme();
  const { data: tags, isLoading, isFetched, refetch } = useTags();

  const { isRefreshing, onRefresh } = useRefresh({ callback: refetch });

  const hasTags = isFetched && tags && tags.length > 0;
  const hasNoTags = !hasTags && isFetched;

  return (
    <>
      <StatusBar />
      <Appbar.Header style={{ backgroundColor: theme.colors.primaryContainer }}>
        <Appbar.Action icon="menu" onPress={navigation?.toggleDrawer} />
        <Appbar.Content title="Tags" />
        <Appbar.Action icon="magnify" onPress={() => {}} />
      </Appbar.Header>
      <View
        style={{
          ...styles.mainContainer,
          backgroundColor: theme.colors.background,
        }}
      >
        {isLoading && <Loading />}
        {hasNoTags && <Text>You don't have any tags yet.</Text>}
        {hasTags && (
          <ScrollView
            contentInsetAdjustmentBehavior="automatic"
            contentContainerStyle={{
              ...styles.tagsContainer,
              backgroundColor: theme.colors.background,
            }}
            refreshControl={
              <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
            }
          >
            {tags?.map(tag => (
              <Chip key={tag.id}>#{tag.name}</Chip>
            ))}
          </ScrollView>
        )}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  tagsContainer: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
    gap: 8,
    paddingVertical: 12,
    paddingHorizontal: 6,
  },
});
