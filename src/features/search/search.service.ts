import { API_BASE_URL } from "@/src/constants/config";
import { SearchResult } from "./search.types";

const SEARCH_URL = `${API_BASE_URL}/search`;

export async function searchPlaces(
  query: string
): Promise<SearchResult[]> {
  if (!query.trim()) {
    return [];
  }

  try {
    const response = await fetch(`${SEARCH_URL}?query=${encodeURIComponent(query)}`);

    if (!response.ok) {
      throw new Error("Failed to search places.");
    }

    const results: SearchResult[] = await response.json();
    
    return results;
  } catch(error) {
    throw error;
  }
}