import { DrawerNavigationHelpers } from "@react-navigation/drawer/lib/typescript/src/types";
import React from "react";
import { Appbar, useTheme } from "react-native-paper";
import { StatusBar, View, Text } from "react-native";

interface AddBookmarkScreenProps {
  navigation?: DrawerNavigationHelpers;
}

export function AddBookmarkScreen({ navigation }: AddBookmarkScreenProps) {
  const theme = useTheme();
  return (
    <>
      <StatusBar />
      <Appbar.Header style={{ backgroundColor: theme.colors.primaryContainer }}>
        <Appbar.BackAction onPress={navigation?.goBack} />
      </Appbar.Header>
      <View style={{ backgroundColor: theme.colors.background, flex: 1 }}>
        <Text>Hi</Text>
      </View>
    </>
  );
}
