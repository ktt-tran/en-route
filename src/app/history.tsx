import HistoryControls from "@/src/components/history/HistoryControls";
import { router, useFocusEffect } from "expo-router";
import React from "react";
import { FlatList, Pressable, Text, View } from "react-native";
import { useTripHistory } from "../hooks/useTrip";

export default function HistoryScreen() {
    const {
        trips,
        isLoading,
        error,
        reload,
    } = useTripHistory();
  
    useFocusEffect(
      React.useCallback(() => {
        reload();
      }, [reload])
    );

  return (
    <View className="flex-1 relative bg-white p-5">

      <Text className="mt-20 text-3xl text-primary font-bold mb-5">
        Trip History
      </Text>

      {isLoading && (
          <Text>Loading trips...</Text>
      )}

      {error && (
          <Text className="text-red-500">
              {error}
          </Text>
      )}

      {!isLoading && trips.length === 0 && (
          <Text className="text-gray-500">
              No trips yet.
          </Text>
      )}

      <FlatList
        style={{ maxHeight: '78%' }}
        data={trips}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Pressable
            onPress={() => router.push(`/trip/${item.id}`)}
            className="p-5 bg-gray-100 mt-4 rounded-xl shadow-sm"
          >
            <Text className="text-lg font-semibold">
              {item.destination.name ?? `Coordinates: ${item.destination.coordinates}`}
            </Text>

            <Text className="text-gray-500 mt-1">
              {new Date(item.startedAt).toLocaleString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    hour: 'numeric',
                    minute: '2-digit',
                    hour12: true
                  })}
            </Text>

          </Pressable>
        )}
      />
      <HistoryControls />
    </View>
  );
}