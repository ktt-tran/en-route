import * as LocationService from "@/src/features/location/location.service";
import type { UserLocation } from "@/src/features/location/location.types";
import * as Location from "expo-location";
import { useEffect, useRef, useState } from "react";

export function useLocation() {
    const [userLocation, setUserLocation] = useState<UserLocation | null>(null);
    const [userPermission, setPermission] = useState<Location.LocationPermissionResponse | null>(null);
    const [errorMsg, setErrorMsg] = useState<string | null>(null);
    const subscription = useRef<Location.LocationSubscription | null>(null);

    async function requestPermission() {
        const permission = await LocationService.requestPermission(); 
        setPermission(permission);

        if (permission.status !== "granted") {
            setErrorMsg('Permission to access location was denied');
            return false;
        }

        return true;
    }

    async function getCurrentLocation() {
        const location = await LocationService.getCurrentLocation();
        setUserLocation(location);
    }

    async function startWatching() {
        subscription.current = await LocationService.startWatching(
            (location) => {
                setUserLocation(location);
            }
        )
    }
        
    async function stopWatching() {
        subscription.current?.remove();
        subscription.current = null;
    }

    useEffect(() => {
        async function initialize() {
            const granted =
                await requestPermission();

            if (!granted) return;

            await getCurrentLocation();

            await startWatching();
        }

        initialize();

        return () => {
            stopWatching();
        };
    }, []);


    return {
        userLocation,
        userPermission,
        errorMsg,
        requestPermission,
        getCurrentLocation,
        startWatching,
        stopWatching,
    };
}