import itertools
import httpx
from .scoring import scoring
from app.schemas.routing import (RouteRequest, RouteResponse, TransportMode)

VALHALLA_COSTING = {
    TransportMode.AUTO: "auto",
    TransportMode.WALKING: "pedestrian",
    TransportMode.BICYCLING: "bicycle",
}

class OptimizationService:

    def __init__(self, valhalla: ValhallaService):
        self.valhalla = valhalla
        self.base_url = valhalla.base_url
        
    async def get_optimized_route(self, request: RouteRequest) -> RouteResponse:

        locations = request.locations

        if len(locations) <= 3:
            return await self.valhalla.get_route(request)

        candidate_request: RouteRequest = request
        best_score = float("inf")

        origin = locations[0]
        origin_coords = {"lat": origin.latitude, "lon": origin.longitude}
        destination = locations[-1]
        destination_coords = {"lat": destination.latitude, "lon": destination.longitude}
        checkpoints = locations[1:-1]
        
        # Iterate through every permutation of checkpoints to find the best with
        # origin and destination to find the overall travel time and trip distance
        for permutation in itertools.permutations(checkpoints):
            #
            # Build ValhallaService request locations parameter
            #
            candidate_locations = [
                origin,
                *permutation,
                destination,
            ]

            permutation_coords = [
                    {
                        "lat": checkpoint.latitude,
                        "lon": checkpoint.longitude,
                    }
                    for checkpoint in permutation
                ]

            #
            # Build the Valhalla API coordinates parameter
            candidate_locations_coords = [
                origin_coords,
                *permutation_coords,
                destination_coords,
            ]

            candidate_request = RouteRequest(
                locations=candidate_locations,
                mode=request.mode,
            )

            payload = {
                "locations": candidate_locations_coords,
                "costing": VALHALLA_COSTING[request.mode],
                "units": "miles",
            }

            async with httpx.AsyncClient() as client:
                response = await client.post(
                    f"{self.base_url}/route",
                    json=payload,
                )

            response.raise_for_status()

            data = response.json()

            trip = data["trip"]
            summary = trip["summary"]

            distance_miles = summary["length"]
            duration_seconds = summary["time"]

            current_score = scoring(distance_miles, duration_seconds)

            if current_score < best_score:
                best_score = current_score
                best_request = candidate_request

        return await self.valhalla.get_route(best_request)