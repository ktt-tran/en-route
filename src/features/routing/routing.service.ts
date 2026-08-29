import { api } from "@/src/api/client";
import { RouteRequest, RouteResponse } from "./routing.types";

export async function fetchRoute(request: RouteRequest): Promise<RouteResponse> {
    const response = await api.post("/route", request);

    return response.data;
}