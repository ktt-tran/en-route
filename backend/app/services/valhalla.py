import httpx
from app.schemas.coordinates import Coordinates
from app.schemas.route import TransportationMode

VALHALLA_COSTING = {
    TransportationMode.AUTO: "auto",
    TransportationMode.WALKING: "pedestrian",
    TransportationMode.BICYCLING: "bicycle",
}

class ValhallaService:

    def __init__(self, base_url: str):
        self.base_url = base_url

    async def create_route(self, origin: Coordinates, destination: Coordinates, mode: TransportationMode):
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

            return response.json()