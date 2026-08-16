import EndButton from "@/src/components/route/EndButton";
import { matchLocationToRoute } from "@/src/features/navigation/routeMatcher";
import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { Text, View } from "react-native";
import MapComponent from "../components/map/MapComponent.native";
import { useLocation } from "../hooks/useLocation";
import { useNavigationStore } from "../store/navigationStore";
import { formatDuration } from "../utils/formatting";

const METERS_PER_MILE = 1609.344;

export default function TripRoute() {
  const { userLocation } = useLocation();
  const destination = useNavigationStore((state) => state.destination);
  const navigationRoute = useNavigationStore((state) => state.navigationRoute);
  const setLiveLocation = useNavigationStore((state) => state.setLiveLocation)
  const updateRouteMatch = useNavigationStore((state) => state.updateRouteMatch);
  const distanceRemaining = useNavigationStore((state) => state.distanceRemaining);
  const remainingDuration = useNavigationStore((state) => state.remainingDuration); 
  const navigationActive = useNavigationStore((state) => state.navigationActive);
  const [currentTime, setCurrentTime] = useState(Date.now());
  const sheetRef = useRef<BottomSheet>(null);

  // Percent-of-screen snap points — drag between these
  const snapPoints = useMemo(() => ["25%", "50%", "90%"], []);

  // useEffect(() => {
  //   if (!navigationActive) { router.replace("/"); }
  // }, [navigationActive]);

  useEffect(() => {
      if (!navigationActive) {
          console.log("[Navigation] Not active");
          return;
      }

      if (!userLocation) {
          console.log("[Navigation] Waiting for user location...");
          return;
      }

      console.log(
          "[Navigation] GPS:",
          userLocation.coordinates,
          "accuracy:",
          userLocation.accuracy,
          "speed:",
          userLocation.speed
      );

      setLiveLocation(userLocation.coordinates);

      if (!navigationRoute) {
          console.log("[Navigation] No navigation route available");
          return;
      }

      console.log(
          "[Navigation] Route geometry points:",
          navigationRoute.geometry.length
      );

      console.log(
          "[Navigation] Route distance:",
          navigationRoute.distance_miles,
          "miles"
      );

      const match = matchLocationToRoute(
          userLocation.coordinates,
          navigationRoute.geometry
      );

      if (!match) {
          console.log("[Navigation] Route matching failed");
          return;
      }

      console.log("[Navigation] Route match:", {
          matchedLocation: match.matchedLocation,
          distanceFromRoute: match.distanceFromRoute,
          distanceAlongRoute: match.distanceAlongRoute,
      });

      updateRouteMatch(
          match.matchedLocation,
          match.distanceAlongRoute,
          match.distanceFromRoute
      );

      const timer = setInterval(() => setCurrentTime(Date.now()), 60000);
      return () => clearInterval(timer);
  }, [
      userLocation,
      navigationActive,
      navigationRoute,
      setLiveLocation,
      updateRouteMatch,
  ]);

  // calculates eta
  const eta = currentTime + (remainingDuration * 1000);

  return (
    <View className="flex-1 bg-transparent">
      <MapComponent userLocation={userLocation} route={navigationRoute ?? undefined} />
      <BottomSheet
        ref={sheetRef}
        index={1}                 // starts at the 50% snap point
        snapPoints={snapPoints}
        enablePanDownToClose={false}
        backgroundStyle={{ backgroundColor: "white" }}
        handleIndicatorStyle={{ backgroundColor: "#ccc" }}
      >
        <BottomSheetScrollView
          contentContainerStyle={{ padding: 20, paddingBottom: 100 }}
        >
          <Text className="text-3xl font-bold mb-5">Your Trip</Text>
          <Text>{destination?.name}</Text>
          <Text className="mt-4 font-semibold">Route Details</Text>
          <Text>Distance:{" "}
            {navigationRoute
              ? `${(distanceRemaining / METERS_PER_MILE).toFixed(1)} mi`
            : "--"}
          </Text>
          <Text>Duration:{" "}
            {navigationRoute
              ? `${formatDuration(remainingDuration)}`
            : "--"}
          </Text>
          <Text>ETA:{" "}
            {navigationRoute && eta
              ? new Date(eta).toLocaleDateString([], { hour: '2-digit', minute: '2-digit' })
            : "--"}
          </Text>

          {/* Add more route steps/instructions here - they'll scroll
              naturally once content exceeds the sheet's current height */}
        </BottomSheetScrollView>
      </BottomSheet>

      <EndButton />
    </View>
  );
}