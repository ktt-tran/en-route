import httpx
import polyline
from app.schemas.coordinates import Coordinates
from app.schemas.routing import (TransportationMode, Maneuver, RouteResponse)


VALHALLA_COSTING = {
    TransportationMode.AUTO: "auto",
    TransportationMode.WALKING: "pedestrian",
    TransportationMode.BICYCLING: "bicycle",
}

class ValhallaService:

    def __init__(self, base_url: str):
        self.base_url = base_url

    async def get_route(self, origin: Coordinates, destination: Coordinates, mode: TransportationMode):
        payload = {
            "locations": [
                {
                    "lat": origin.latitude,
                    "lon": origin.longitude,
                },
                {
                    "lat": destination.latitude,
                    "lon": destination.longitude,
                },
            ],
            "costing": VALHALLA_COSTING[mode],
            "units": "miles",
        }

        async with httpx.AsyncClient() as client:
            response = await client.post(
                f"{self.base_url}/route",
                json=payload,
            )

            response.raise_for_status()

            # extract the neccessary routing information and data from the valhalla JSON response 
            data = response.json()

            trip=data["trip"]
            summary=trip["summary"]
            leg=trip["legs"][0]
            distance=summary["length"]
            duration=summary["time"]

            # decode the route shape using polylins
            decoded_route_lines = polyline.decode(
                leg["shape"],
                geojson=False,
            )

            # save the geometry
            geometry = [
                Coordinates(
                    latitude=lat,
                    longitude=lon,
                )
                for lat, lon in decoded_route_lines
            ]

            # store the manuevers needed in chronological order
            maneuvers=[]

            for maneuver in leg["maneuvers"]:
                maneuvers.append(
                    Maneuver(
                        instruction=maneuver["instruction"],
                        distance_miles=maneuver["length"],
                        duration_seconds=maneuver["time"],
                    )
                )

            return RouteResponse(
            distance_miles=distance,
            duration_seconds=duration,
            geometry=geometry,
            maneuvers=maneuvers,
        )


