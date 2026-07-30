import { Coordinates } from "@/src/types/coordinates";
import * as Location from "expo-location";
import { SearchQuery, SearchResult } from "./search.types";

export async function queryToGeocode({text}: SearchQuery): Promise<SearchResult | null> {
    const result = await Location.geocodeAsync(text);

    if (!result.length) {
        return null;
    }
        
    return {
        name: text,
        address: {
            formatted: text,
        },
        coordinate: {
            latitude: result[0].latitude,
            longitude: result[0].longitude,
        },
    };
}

export async function geocodeToAddress(coords: Coordinates): Promise<SearchResult | null> {
    const result = await Location.reverseGeocodeAsync(coords);

    if (!result.length) {
        return null;
    }

    const address = result[0];

    return {
        name: address.name ?? "",
        address: {
        street: address.street ?? "",
        city: address.city ?? "",
        state: address.region ?? "",
        postalCode: address.postalCode ?? "",
        country: address.country ?? "",
        formatted: [
            address.street,
            address.city,
            address.region,
        ]
            .filter(Boolean)
            .join(", "),
        },
        coordinate: coords,
    };
}