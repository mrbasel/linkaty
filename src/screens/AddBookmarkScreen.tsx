import { DrawerNavigationHelpers } from "@react-navigation/drawer/lib/typescript/src/types";
import React from "react";
import { Appbar, Button, TextInput, useTheme } from "react-native-paper";
import { StatusBar, View, StyleSheet } from "react-native";
import { useCreateBookmark } from "../api/mutations";
import { Header } from "../components/Header";

interface AddBookmarkScreenProps {
  navigation?: DrawerNavigationHelpers;
}

export function AddBookmarkScreen({ navigation }: AddBookmarkScreenProps) {
  const theme = useTheme();
  const { mutateAsync: createBookmark, isLoading } = useCreateBookmark();
  const [url, setUrl] = React.useState("");
  const [tags, setTags] = React.useState("");
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");

  const isDisabledAdd = url.trim().length === 0;

  const handleAdd = async () => {
    const tagsArray = tags.split(" ");
    const payload: Parameters<typeof createBookmark>[0] = {
      url,
      tag_names: tagsArray,
      title,
      description,
    };
    await createBookmark(payload);
    navigation?.goBack();
  };

  return (
    <>
      <Header>
        <Appbar.BackAction onPress={navigation?.goBack} />
        <Appbar.Content title="Add bookmark" />
      </Header>
      <View
        style={{
          backgroundColor: theme.colors.background,
          ...styles.container,
        }}
      >
        <TextInput
          mode="outlined"
          label="URL (required)"
          value={url}
          onChangeText={text => setUrl(text)}
        />
        <TextInput
          mode="outlined"
          label="Tags"
          value={tags}
          onChangeText={text => setTags(text)}
        />
        <TextInput
          mode="outlined"
          label="Title"
          value={title}
          onChangeText={text => setTitle(text)}
        />
        <TextInput
          mode="outlined"
          label="Description"
          value={description}
          onChangeText={text => setDescription(text)}
        />
        <Button
          mode="contained"
          onPress={handleAdd}
          disabled={isDisabledAdd}
          loading={isLoading}
        >
          Add
        </Button>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    gap: 20,
  },
});
