import { api } from "@/src/api/client";
import { RouteRequest, RouteResponse } from "../routing/routing.types";

export async function fetchOptimizedRoute(request: RouteRequest): Promise<RouteResponse> {
    const response = await api.post("/optimization", request);

    return response.data;
}