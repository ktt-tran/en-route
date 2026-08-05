import { api } from "@/src/api/client";
import { SearchResult } from "./search.types";

export async function searchPlaces(query: string): Promise<SearchResult[]> {
    if (!query.trim()) {
        return [];
    }

    const response = await api.get("/search", {
        params: {
            query,
        }
    });

    return response.data;
}