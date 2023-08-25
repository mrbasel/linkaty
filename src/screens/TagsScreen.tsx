import { DrawerNavigationHelpers } from "@react-navigation/drawer/lib/typescript/src/types";
import React, { useMemo } from "react";
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
import { Header } from "../components/Header";
import { TagItem } from "../components/TagItem";

interface TagsScreenProps {
  navigation?: DrawerNavigationHelpers;
}

export function TagsScreen({ navigation }: TagsScreenProps): JSX.Element {
  const theme = useTheme();
  const { data: tags, isLoading, isFetched, refetch } = useTags();

  const { isRefreshing, onRefresh } = useRefresh({ callback: refetch });

  const hasTags = isFetched && tags && tags.length > 0;
  const hasNoTags = !hasTags && isFetched;

  const sortedTags = useMemo(
    () => tags?.sort((a, b) => a.name.localeCompare(b.name)),
    [tags],
  );

  return (
    <>
      <Header>
        <Appbar.Action icon="menu" onPress={navigation?.toggleDrawer} />
        <Appbar.Content title="Tags" />
      </Header>
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
            refreshControl={
              <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
            }
          >
            {sortedTags?.map(tag => (
              <TagItem key={tag.id} tag={tag} />
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
    paddingBottom: 10,
  },
});
