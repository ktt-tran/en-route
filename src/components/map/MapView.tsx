// center: Coordinate | null
// zoom: number

{/* <MapView

route={route.geometry}

userLocation={location.coordinate}

cameraFollow={true}

/> */}

// import { Camera, Map } from '@maplibre/maplibre-react-native';
// import React from 'react';

// export default function MapComponent() {
//   return (
//     <Map style={{ flex: 1 }} mapStyle="https://maplibre.org">
//       <Camera initialViewState={{ zoom: 12, center: [xx,xx] }} />
//     </Map>
//   );
// }

// <Map>
//   <Camera ... />
//   <UserLocation />
//   {/* Route line */}
//   {/* Destination marker */}
//   {/* Search marker */}
// </Map>

import { UserLocation as UserLocationType } from "@/src/features/location/location.types";
import { Camera, Map } from "@maplibre/maplibre-react-native";

type MapComponentProps = {
  userLocation: UserLocationType | null;
};

export default function MapComponent({
  userLocation,
}: MapComponentProps) {
  return (
    <Map
      style={{ flex: 1 }}
      mapStyle="https://demotiles.maplibre.org/style.json"
    >
      {userLocation && (
        <Camera
          initialViewState={{
            center: [
              userLocation.coordinate.longitude,
              userLocation.coordinate.latitude,
            ],
            zoom: 15,
          }}
        />
      )}
    </Map>
  );
}