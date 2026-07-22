import {
  FlatList,
  Pressable,
  Text,
  View,
} from "react-native";

import { router } from "expo-router";

const trips = [
  {
    id: "1",
    destination: "Washington DC",
    date: "Today",
  },
  {
    id: "2",
    destination: "Philadelphia",
    date: "Yesterday",
  },
];

export default function HistoryScreen() {
  return (
    <View className="flex-1 p-5 bg-white">

      <Text className="mt-20 text-3xl font-bold mb-5">
        Trip History
      </Text>

      <FlatList
        data={trips}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Pressable
            onPress={() => router.push(`/trip/${item.id}`)}
            className="p-5 bg-gray-100 mt-4 rounded-xl"
          >
            <Text className="text-lg font-semibold">
              {item.destination}
            </Text>

            <Text className="text-gray-500 mt-1">
              {item.date}
            </Text>

          </Pressable>
        )}
      />

    </View>
  );
}