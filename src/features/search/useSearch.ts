import { useEffect, useState } from "react";
import { searchPlaces } from "./search.service";
import { SearchResult } from "./search.types";

export function useSearch(query: string) {
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const timeout = setTimeout(async () => {
      try {
        setLoading(true);
        setError(null);

        const data = await searchPlaces(query);

        setResults(data);
      } catch (err) {
        setError("Unable to search locations.");
        setResults([]);
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => clearTimeout(timeout);
  }, [query]);

  return {
    results,
    loading,
    error,
  };
}