import React from "react";
import { Alert, Pressable, Text, View } from "react-native";

interface TripControlsProps {
  onDelete: () => void;
  deleting?: boolean;
}

export function TripControls({onDelete, deleting = false}: TripControlsProps) {

  const handleDelete = () => {
    Alert.alert(
      "Delete Trip",
      "Are you sure you want to delete this trip?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: onDelete,
        },
      ]
    );
  };

  return (
    <View className="flex-row bottom-12 w-full gap-3">

      <Pressable
        onPress={handleDelete}
        disabled={deleting}
        className="rounded-full h-14 flex-1 items-center justify-center shadow-2xl bg-gray-200"
      >
        <Text className="text-2xl text-gray-700 font-bold tracking-tight">
          Delete
        </Text>
      </Pressable>

      <Pressable
        className="rounded-full h-14 flex-1 items-center justify-center shadow-2xl bg-primary"
      >
        <Text className="text-2xl text-white font-bold tracking-tight">
          Start
        </Text>
      </Pressable>

    </View>
  );
}