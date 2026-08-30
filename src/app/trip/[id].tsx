import { buildRouteCard } from "@/src/components/history/BuildRouteCard";
import InfoCard from "@/src/components/history/InfoCard";
import TripCard from "@/src/components/history/TripCard";
import { TripControls } from "@/src/components/history/TripCardControls";
import { useTrip } from "@/src/hooks/useTrip";
import { router, useLocalSearchParams } from "expo-router";
import React from "react";
import { Pressable, Text, View } from "react-native";

export default function TripDetails() {
  const { id } = useLocalSearchParams();
  const tripId = Number(id);

  const {
    trip,
    isLoading,
    error,
    isDeleting,
    removeTrip,
  } = useTrip(tripId);

  const handleDelete = async () => {
    const deleted = await removeTrip();
    if (deleted) { router.dismissTo("/history")};
  }

  if (isLoading) {
    return (
        <View className="flex-1 items-center justify-center">
            <Text>Loading trip...</Text>
        </View>
    );
  }

  if (!trip) {
      return (
          <View className="flex-1 items-center justify-center">
              <Text>
                  {error ?? "Trip not found"}
              </Text>

            <Pressable
                onPress={() => router.replace("/history")}
                className="mt-5 px-6 py-3 rounded-full bg-primary"
            >
                <Text className="text-white font-bold">
                    Back to History
                </Text>
            </Pressable>
          </View>
      );
  }

  const stops = buildRouteCard(trip);

  return (
    <View className="flex-1 relative bg-white">     
      <View className="flex-1 p-5">
        <View className="mt-12 mb-6">
          <Text className="text-sm font-semibold text-gray-400 tracking-widest uppercase">
            Trip Date:
            {` ${new Date(
                trip.startedAt).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      hour: 'numeric',
                      minute: '2-digit',
                      hour12: true
                    })} - ${new Date(
                trip.endedAt).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      hour: 'numeric',
                      minute: '2-digit',
                      hour12: true
                    })}
            `}
          </Text>
          <Text className="text-3xl font-bold text-slate-900 mt-1">
            {trip.destination.name ?? "Nameless"}
          </Text>
        </View>

        <InfoCard TOTAL_DISTANCE={trip.distanceMiles} TOTAL_DURATION={trip.durationSeconds} />

        <TripCard stops={stops}/>
      </View>

      <View className="p-5">
        <TripControls onDelete={handleDelete} deleting={isDeleting} tripId={tripId} />
      </View>
    </View>
  );
}