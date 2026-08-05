import { api } from "@/src/api/client";
import { RouteRequest, RouteResponse } from "@/src/types/routing";

export async function fetchRoute(request: RouteRequest): Promise<RouteResponse> {
    const response = await api.post("/routes", request);

    return response.data;
}