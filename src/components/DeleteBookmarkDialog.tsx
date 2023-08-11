import React from "react";
import { Button, Dialog, Portal, Text } from "react-native-paper";
import { useDeleteBookmark } from "../api/mutations";
// import { Text } from "react-native";

interface DeleteBookmarkDialogProps {
  bookmarkId: number;
  visible: boolean;
  onDismiss: () => void;
}

export function DeleteBookmarkDialog({
  visible,
  onDismiss,
  bookmarkId,
}: DeleteBookmarkDialogProps) {
  const { mutateAsync: deleteBookmark, isLoading } = useDeleteBookmark();
  const handleDelete = async () => {
    await deleteBookmark(bookmarkId);
    onDismiss();
  };

  return (
    <Portal>
      <Dialog visible={visible} onDismiss={onDismiss}>
        <Dialog.Title>Warning!</Dialog.Title>
        <Dialog.Content>
          <Text variant="bodyMedium">
            Are you sure you want to delete this bookmark?
          </Text>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={onDismiss}>Cancel</Button>
          <Button onPress={handleDelete} loading={isLoading}>
            Delete
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
}
