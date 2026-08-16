import type { RouteResponse } from "@/src/features/routing/routing.types";

export type RoutePreviewSheetProps = {
  route?: RouteResponse;
  isLoading: boolean;
  error: Error | null;
};