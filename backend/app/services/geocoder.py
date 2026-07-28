import httpx
from app.schemas.search import SearchResult, Address, Coordinate
from app.config import NOMINATIM_URL

async def search_places(query: str) -> list[SearchResult]:
    params = {
        "q": query,
        "format": "jsonv2",
        "addressdetails": 1,
        "limit": 5,
    }

    async with httpx.AsyncClient() as client:
        response = await client.get(
            f"{NOMINATIM_URL}/search",
            params=params,
        )

    print(response)

    response.raise_for_status()

    data = response.json()

    results = []

    for place in data:
        results.append(
            {
                "name": place.get("display_name"),
                "address": place.get("address", {}),
                "coordinate": {
                    "latitude": float(place["lat"]),
                    "longitude": float(place["lon"]),
                },
            }
        )

    return results

async def reverse_geocode(latitude: float, longitude: float) -> list[SearchResult]:
    params = {
        "lat": latitude,
        "lon": longitude,
        "format": "jsonv2",
        "addressdetails": 1,
        "limit": 5,
    }

    async with httpx.AsyncClient() as client:
        response = await client.get(
            f"{NOMINATIM_URL}/reverse",
            params=params,
        )

    print(response)

    response.raise_for_status()

    data = response.json()

    results = []

    for place in data:
        results.append(
            {
                "name": place.get("display_name"),
                "address": place.get("address", {}),
                "coordinate": {
                    "latitude": float(place["lat"]),
                    "longitude": float(place["lon"]),
                },
            }
        )

    return results