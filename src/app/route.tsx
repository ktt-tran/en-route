import { EndButton } from "@/src/components/route/RouteControls";
import { matchLocationToRoute } from "@/src/features/navigation/routeMatcher";
import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { router } from "expo-router";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { Text, View } from "react-native";
import MapComponent from "../components/map/MapComponent.native";
import { isArrived } from "../features/navigation/arrivalDetector";
import { isLocationOffRoute } from "../features/navigation/offRouteDectector";
import { useLocation } from "../hooks/useLocation";
import { useRerouting } from "../hooks/useRerouting";
import { useNavigationStore } from "../store/navigationStore";
import { formatDuration } from "../utils/formatting";

const METERS_PER_MILE = 1609.344;

export default function TripRoute() {
  const { userLocation } = useLocation();
  const destination = useNavigationStore((state) => state.destination);
  const navigationRoute = useNavigationStore((state) => state.navigationRoute);
  const setLiveLocation = useNavigationStore((state) => state.setLiveLocation);
  const updateRouteMatch = useNavigationStore((state) => state.updateRouteMatch);
  const distanceRemaining = useNavigationStore((state) => state.distanceRemaining);
  const remainingDuration = useNavigationStore((state) => state.remainingDuration); 
  const setOffRoute = useNavigationStore((state) => state.setOffRoute);
  const navigationActive = useNavigationStore((state) => state.navigationActive);
  const navigationStatus = useNavigationStore((state) => state.navigationStatus);
  const setNavigationStatus = useNavigationStore((state) => state.setNavigationStatus);
  const { reroute } = useRerouting(userLocation);
  const [currentTime, setCurrentTime] = useState(Date.now());
  const sheetRef = useRef<BottomSheet>(null);
  // Percent-of-screen snap points — drag between these
  const snapPoints = useMemo(() => ["25%", "50%", "90%"], []);

  useEffect(() => {
      if (!navigationActive) {
          router.replace("/");
          console.log("[Navigation] Not active");
          return;
      }

      if (navigationStatus !== "navigating") return;

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

      if (!destination) { return; }

      if (!navigationRoute) {
        console.log("[Navigation] No navigation route available");
        return;
      }

      setLiveLocation(userLocation.coordinates);

      if (
          isArrived(
              userLocation.coordinates,
              destination.coordinates
          )
      ) {
          console.log("[Navigation] Destination reached");

          setNavigationStatus("arrived");

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

      const offRoute = isLocationOffRoute(
          match.distanceFromRoute
      );

      setOffRoute(offRoute);

      console.log("[Navigation] Route status:", {
          distanceFromRoute: match.distanceFromRoute,
          offRoute,
      });

      if (offRoute) {
        reroute();
      };

      const timer = setInterval(() => setCurrentTime(Date.now()), 60000);
      return () => clearInterval(timer);
  }, [
      userLocation,
      navigationActive,
      navigationRoute,
      navigationStatus,
      setNavigationStatus,
      updateRouteMatch,
      setOffRoute,
      reroute,
  ]);

  // calculates eta using live device clock
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
          
          {navigationStatus === "arrived" ? (
            <>
                <Text className="text-3xl font-bold mb-5">Arrived</Text>
                <Text className="text-lg">You have arrived at {destination?.name}.</Text>
            </>
          ) : (
            <>
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
                  ? new Date(eta).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    hour: 'numeric',
                    minute: '2-digit',
                    hour12: true
                  })
                : "--"}
              </Text>
            </>
          )}

          {/* Add more route steps/instructions here - they'll scroll
              naturally once content exceeds the sheet's current height */}
        </BottomSheetScrollView>
      </BottomSheet>

      <EndButton />
    </View>
  );
}