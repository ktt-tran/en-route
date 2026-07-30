import httpx
from app.schemas.coordinates import Coordinates

class ValhallaService:

    def __init__(self, base_url: str):
        self.base_url = base_url

    async def route(self, origin: Coordinates, destination: Coordinates):
        payload = {
            "location": [
                {
                    "lat": origin.latitude,
                    "lon": origin.longitude,
                },
                {
                    "lat": destination.latitude,
                    "lon": destination.longitude,
                },
            ],
            "costing": "auto",
            "units": "miles",
        }

        async with httpx.AsyncClient() as client:
            response = await client.post(
                f"{self.base_url}/route",
                json=payload,
            )

            response.raise_for_status()

            return response.json()