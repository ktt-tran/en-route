import itertools
import httpx
from .scoring import scoring
from app.schemas.routing import (RouteRequest, RouteResponse)


class OptimizationService:

    def __init__(self, valhalla: ValhallaService):
        self.valhalla = valhalla

    async def get_optimized_route(self, request: RouteRequest) -> RouteResponse:

        locations = request.locations

        if len(locations) <= 3:
            return await self.valhalla.get_route(request)

        best_route: RouteResponse | None = None
        best_score = float("inf")

        origin = locations[0]
        destination = locations[-1]
        checkpoints = locations[1:-1]
        
        # Iterate through every permutation of checkpoints to find the best with
        # origin and destination to find the overall travel time and trip distance
        for permutation in itertools.permutations(checkpoints):
            #
            # Build Valhalla request
            #
            candidate_locations = [
                origin,
                *permutation,
                destination,
            ]

            candidate_request = RouteRequest(
                locations=candidate_locations,
                mode=request.mode,
            )

            route = await self.valhalla.get_route(candidate_request)

            current_score = scoring(route.distance_miles, route.duration_seconds)

            if current_score < best_score:
                best_score = current_score
                best_route = route

        if best_route is None:
            raise RuntimeError("Unable to find an optimized route")

        return best_route