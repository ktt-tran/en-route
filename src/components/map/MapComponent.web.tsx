import * as maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";
import { View } from "react-native";
import type { MapComponentProps, MapComponentRef } from "./MapComponent.types";

const DEFAULT_CENTER: [number, number] = [-76.4702, 38.9559];

const MapComponent = forwardRef<MapComponentRef, MapComponentProps>(
  ({ userLocation }, ref) => {
    // On web, react-native-web forwards the View's ref to the underlying <div>.
    const containerRef = useRef<View | null>(null);
    const mapRef = useRef<maplibregl.Map | null>(null);
    const userMarkerRef = useRef<maplibregl.Marker | null>(null);

    // Create the map once on mount
    useEffect(() => {
      const container = containerRef.current as unknown as HTMLDivElement;
      if (!container || mapRef.current) return;

      const initialCenter: [number, number] = userLocation
        ? [
            userLocation.coordinate.longitude,
            userLocation.coordinate.latitude,
          ]
        : DEFAULT_CENTER;

      const map = new maplibregl.Map({
        container,
        style: "https://demotiles.maplibre.org/globe.json",
        center: initialCenter,
        zoom: 14,
      });

      map.addControl(new maplibregl.NavigationControl(), "top-left");
      mapRef.current = map;

      return () => {
        map.remove();
        mapRef.current = null;
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Keep the user location marker in sync
    useEffect(() => {
      const map = mapRef.current;
      if (!map || !userLocation) return;

      const coords: [number, number] = [
        userLocation.coordinate.longitude,
        userLocation.coordinate.latitude,
      ];

      if (!userMarkerRef.current) {
        userMarkerRef.current = new maplibregl.Marker({ color: "#2563eb" })
          .setLngLat(coords)
          .addTo(map);
      } else {
        userMarkerRef.current.setLngLat(coords);
      }
    }, [userLocation]);

    useImperativeHandle(ref, () => ({
      animateToCoordinate: (latitude, longitude, zoomLevel = 16) => {
        mapRef.current?.flyTo({
          center: [longitude, latitude],
          zoom: zoomLevel,
          essential: true,
        });
      },
    }));

    return <View ref={containerRef} style={{ flex: 1 }} />;
  }
);

export default MapComponent;