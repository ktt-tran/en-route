// import { Camera, Map } from '@maplibre/maplibre-react-native';
// import React from 'react';

// export default function MapComponent() {
//   return (
//     <Map style={{ flex: 1 }} mapStyle="https://maplibre.org">
//       <Camera initialViewState={{ zoom: 12, center: [xx,xx] }} />
//     </Map>
//   );
// }

import * as Location from "expo-location";
import { useEffect, useState } from "react";
import MapView from "react-native-maps";

export default function MapComponent() {
  const [location, setLocation] = useState<any>(null);

  useEffect(() => {
    async function getLocation() {
      const permission =
        await Location.requestForegroundPermissionsAsync();

      if (permission.status !== "granted") return;

      const current =
        await Location.getCurrentPositionAsync({});

      setLocation(current.coords);
    }

    getLocation();
  }, []);

  return (
    <MapView
      style={{ flex: 1 }}
      showsUserLocation
      region={
        location
          ? {
              latitude: location.latitude,
              longitude: location.longitude,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            }
          : undefined
      }
    />
  );
}


