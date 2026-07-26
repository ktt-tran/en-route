import { SearchQuery, SearchResult } from "../search/search.types";
import * as GeocodingService from "./geocoding.service";

export async function searchPlaces(query: SearchQuery): Promise<SearchResult[]> {
    const result = await GeocodingService.queryToGeocode(query);
    if (!result) {
        return [];
    }
    return[result];
}