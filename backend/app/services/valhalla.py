import httpx
import polyline
from app.schemas.coordinates import Coordinates
from app.schemas.routing import (RouteRequest, RouteResponse, RouteLeg, TransportMode)


VALHALLA_COSTING = {
    TransportMode.AUTO: "auto",
    TransportMode.WALKING: "pedestrian",
    TransportMode.BICYCLING: "bicycle",
}

class ValhallaService:

    def __init__(self, base_url: str):
        self.base_url = base_url

    async def get_route(self, request: RouteRequest) -> RouteResponse:
        #
        # Build Valhalla request
        #
        payload = {
            "locations": [
                {
                    "lat": location.latitude,
                    "lon": location.longitude,
                }
                for location in request.locations
            ],
            "costing": VALHALLA_COSTING[request.mode],
            "units": "miles",
        }

        async with httpx.AsyncClient() as client:
            response = await client.post(
                f"{self.base_url}/route",
                json=payload,
            )

            response.raise_for_status()

            # extract the neccessary routing information
            # and data from the valhalla JSON response 
            data = response.json()

            trip = data["trip"]
            summary = trip["summary"]

            # Build individual route legs
            legs: list[RouteLeg] = []

            # Complete route data
            full_geometry: list[Coordinates] = []

            for index, valhalla_leg in enumerate(trip["legs"]):

                _from_location = request.locations[index]
                _to_location = request.locations[index + 1]

                #
                # decode each leg's route geometry using polylines
                #
                decoded_route_lines = polyline.decode(
                    valhalla_leg["shape"],
                    precision=6, # geometry returns coordinates with rounding error w/o precision
                )

                leg_geometry = [
                    Coordinates(
                        latitude=lat,
                        longitude=lon,
                    )
                    for lat, lon in decoded_route_lines
                ]

                #
                #Build RouteLeg
                #
                leg = RouteLeg(
                    from_location = _from_location,
                    to_location = _to_location,
                    distance_miles = valhalla_leg["summary"]["length"],
                    duration_seconds = valhalla_leg["summary"]["time"],
                    #geometry = leg_geometry,
                )

                legs.append(leg)

                #
                # Preserve full route data
                #
                full_geometry.extend(leg_geometry)

            return RouteResponse(
                fullRoute=request.locations,
                distance_miles=summary["length"],
                duration_seconds=summary["time"],
                geometry=full_geometry,
                legs=legs,
            )