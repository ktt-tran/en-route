import * as Location from "expo-location";
import { UserLocation } from "./location.types";

export  async function requestPermission() {
  return await Location.requestForegroundPermissionsAsync();
}

export async function getCurrentLocation(): Promise<UserLocation> {
  const location = await Location.getCurrentPositionAsync({});
  const { coords } = location;

  return {
    coordinate: {
        latitude: coords.latitude,
        longitude: coords.longitude
    },
    accuracy: coords.accuracy,
    altitude: coords.altitude,
    heading: coords.heading,
    speed: coords.speed,
    timestamp: location.timestamp,
  };
}

export async function startWatching(
  callback: (location: UserLocation) => void): Promise<Location.LocationSubscription> {
  return await Location.watchPositionAsync(
    {
      accuracy: Location.Accuracy.BestForNavigation,
      timeInterval: 1000,     // Update about once per second
      distanceInterval: 1,    // Or every meter moved
    },
    (location) => {
      const { coords } = location;

      callback({
        coordinate: {
            latitude: coords.latitude,
            longitude: coords.longitude
        },
        accuracy: coords.accuracy,
        altitude: coords.altitude,
        heading: coords.heading,
        speed: coords.speed,
        timestamp: location.timestamp,
      });
    }
  );
}