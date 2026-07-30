import { SearchResult } from "./search.types";

const API_URL = process.env.EXPO_PUBLIC_API_URL;

if (!API_URL) {
  throw new Error("EXPO_PUBLIC_API_URL is not configured");
}

const SEARCH_URL = `${API_URL}/search`;

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