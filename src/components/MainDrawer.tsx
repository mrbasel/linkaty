import { Text, View } from "react-native";
import React from "react";
import { DrawerNavigationHelpers } from "@react-navigation/drawer/lib/typescript/src/types";

interface MainDrawerProps {
  navigation?: DrawerNavigationHelpers;
}

export function MainDrawer({ navigation }: MainDrawerProps) {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text style={{ color: "blue" }}>Main drawer</Text>
    </View>
  );
}
