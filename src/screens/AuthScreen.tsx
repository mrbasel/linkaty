import React from "react";
import { View, Text } from "react-native";
import { useTheme } from "react-native-paper";

export function AuthScreen() {
  const theme = useTheme();
  return (
    <View style={{ backgroundColor: theme.colors.background, flex: 1 }}>
      <Text>Auth Screen</Text>
    </View>
  );
}
