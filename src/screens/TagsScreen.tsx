import { DrawerNavigationHelpers } from "@react-navigation/drawer/lib/typescript/src/types";
import React, { useMemo } from "react";
import { ScrollView } from "react-native-gesture-handler";
import { Appbar, useTheme } from "react-native-paper";
import { StyleSheet, View, Text, RefreshControl } from "react-native";
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
        {!isLoading && (
          <ScrollView
            style={styles.tagsList}
            contentInsetAdjustmentBehavior="automatic"
            refreshControl={
              <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
            }
          >
            <View>
              {sortedTags?.map(tag => (
                <TagItem key={tag.id} tag={tag} />
              ))}
            </View>
          </ScrollView>
        )}

        {hasNoTags && (
          <View style={styles.statusContainer}>
            <Text>You don't have any tags yet.</Text>
          </View>
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
    paddingBottom: 10,
  },
  tagsList: {
    width: "100%",
  },
  statusContainer: {
    position: "absolute",
  },
});
