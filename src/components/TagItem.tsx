import React from "react";
import { TouchableRipple, Text, Menu, IconButton } from "react-native-paper";
import { View, StyleSheet } from "react-native";
import { Tag } from "../types";

interface TagItemProps {
  tag: Tag;
}

export function TagItem({ tag }: TagItemProps) {
  const handlePress = () => {};
  return (
    <View style={styles.container}>
      <TouchableRipple onPress={handlePress}>
        <View style={styles.innerContainer}>
          <View style={styles.textContainer}>
            <Text variant="bodyLarge" style={styles.tag}>
              #{tag.name}
            </Text>
          </View>
        </View>
      </TouchableRipple>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  innerContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  textContainer: {
    width: "90%",
    paddingVertical: 5,
  },
  tag: {
    color: "#8f9aff",
    textAlign: "left",
    fontWeight: "bold",
  },
  optionsButton: {},
});
