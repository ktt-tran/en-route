import { Camera, Map } from '@maplibre/maplibre-react-native';
import React from 'react';

export default function MapComponent() {
  return (
    <Map style={{ flex: 1 }} mapStyle="https://maplibre.org">
      <Camera initialViewState={{ zoom: 12, center: [-77.0369, 38.9072] }} />
    </Map>
  );
}
