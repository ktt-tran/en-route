import { api } from "@/src/api/client";
import { OptimizationRequest, OptimizedRoute } from "./optimization.types";

export async function fetchOptimizedRoute(request: OptimizationRequest): Promise<OptimizedRoute> {
    const response = await api.post("/optimization", request);

    return response.data;
}