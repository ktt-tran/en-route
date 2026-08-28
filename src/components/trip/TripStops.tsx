import { useTripStore } from "@/src/store/tripStore";
import { Alert, Pressable, Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

export default function TripStops({onPreviewRoute}: {onPreviewRoute:() => void}) {
    const origin = useTripStore((state) => state.origin);
    const destination = useTripStore((state) => state.destination);
    const checkpoints = useTripStore((state) => state.checkpoints);
    const setRoutePlanningMode = useTripStore((state) => state.setPlanningMode);
    const removeCheckpoint = useTripStore((state) => state.removeCheckpoint);
    const reorderCheckpoints = useTripStore((state) => state.reorderCheckpoints);

    /*
     * A trip is valid when it has:
     *
     * 1. Origin
     * 2. Destination
     *
     * Checkpoints are optional.
     */
    const isValidTrip = origin !== null && destination !== null;

    function moveCheckpoint(index: number, direction: "up" | "down") {
        const newIndex = direction === "up" ? index - 1 : index + 1;
        if (newIndex < 0 || newIndex >= checkpoints.length) { return; }
        const reordered = [...checkpoints];
        const current = reordered[index];
        reordered[index] = reordered[newIndex];
        reordered[newIndex] = current;
        reorderCheckpoints(reordered);
    }

    return (
        <View className="w-full bg-white border-t border-gray-200">

            <View className="px-5 pt-4 pb-3">
                <Text className="text-xl font-bold text-primary">
                    Your Trip
                </Text>
            </View>

            <View className="px-5 pb-3">
                <Text className="text-xs font-semibold uppercase text-gray-400">
                    Start
                </Text>
            </View>

            {/* Checkpoint list */}
            <ScrollView
                className="px-5"
                style={{maxHeight: 130}}
                showsVerticalScrollIndicator={true}
            >

                {checkpoints.length === 0 && (
                    <Text className="py-3 text-sm text-gray-400">
                        No stops added
                    </Text>
                )}

                {checkpoints.map(
                    (checkpoint, index) => (

                        <View
                            key={checkpoint.id}
                            className="flex-row items-center py-3 border-t border-gray-100"
                        >

                            <View className="mr-3 h-7 w-7 items-center justify-center rounded-full bg-gray-200">
                                <Text className="text-sm font-semibold">{index + 1}</Text>
                            </View>


                            {/* Name */}

                            <View className="flex-1">

                                <Text
                                    className="text-base"
                                    numberOfLines={1}
                                >
                                    {checkpoint.placeId?.name ??
                                        "Unnamed stop"}
                                </Text>

                            </View>


                            {/* Move Up */}

                            <Pressable
                                disabled={index === 0}
                                onPress={() => moveCheckpoint(index, "up") }
                                className={`px-2 ${
                                    index === 0
                                        ? "opacity-30"
                                        : ""
                                }`}
                            >
                                <Text>↑</Text>
                            </Pressable>


                            {/* Move Down */}

                            <Pressable
                                disabled={index === checkpoints.length - 1}
                                onPress={() => moveCheckpoint(index, "down")}
                                className={`px-2 ${
                                    index ===
                                    checkpoints.length - 1
                                        ? "opacity-30"
                                        : ""
                                }`}
                            >
                                <Text>↓</Text>
                            </Pressable>


                            {/* Remove */}

                            <Pressable
                                onPress={() => removeCheckpoint(checkpoint.id)}
                                className="ml-1 px-2"
                            >
                                <Text className="text-red-500">
                                    ×
                                </Text>
                            </Pressable>

                        </View>
                    )
                )}

            </ScrollView>


            {/* Destination */}

            <View className="px-5 pt-3 pb-3">

                <Text className="text-xs font-semibold uppercase text-gray-400">
                    Destination
                </Text>

                <Text
                    className="mt-1 text-base font-medium"
                    numberOfLines={1}
                >
                    {destination?.name ??
                        "No destination selected"}
                </Text>

            </View>


            {/* Calculate Route */}

            <View className="px-5 pb-4">

                <Pressable
                    disabled={!origin || !isValidTrip}
                    onPress={() => {
                        Alert.alert(
                            "Calculate Route",
                            "How would you like En Route to calculate your route?",
                            [
                                {
                                    text: "Exact Order",
                                    onPress: () => {
                                        setRoutePlanningMode("exact");
                                        onPreviewRoute();
                                    },
                                },
                                {
                                    text: "Optimize",
                                    onPress: () => {
                                        setRoutePlanningMode("optimize");
                                        onPreviewRoute();
                                    },
                                },
                            ]
                        );
                    }}
                    className={`items-center rounded-xl py-3 ${
                        isValidTrip
                            ? "bg-primary"
                            : "bg-gray-300"
                    }`}
                >

                    <Text
                        className={`font-semibold ${
                            isValidTrip
                                ? "text-white"
                                : "text-gray-500"
                        }`}
                    >
                        Calculate Route
                    </Text>

                </Pressable>

            </View>

        </View>
    );
}