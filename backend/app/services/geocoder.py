import httpx
from app.schemas.search import SearchResult, Address, Coordinate
from app.config import NOMINATIM_URL

# Retrieve JOSN parsed data from Nominatim.
async def search_retriever(endpoint: str, params: dict) -> dict | list:
    async with httpx.AsyncClient() as client:
        response = await client.get(
            f"{NOMINATIM_URL}/{endpoint}",
            params=params,
        )

    print(response)
    response.raise_for_status()
    return response.json()

# Build the SearchResult object using a JSON parsed dictionary.
def _to_search_result(place: dict) -> SearchResult:
    address = place.get("address", {})
    return SearchResult(
        name=place.get("display_name", ""),
        address=Address(
            street=address.get("road"),
            city=address.get("city") or address.get("town") or address.get("village"),
            state=address.get("state"),
            postalCode=address.get("postcode"),
            country=address.get("country"),
            formatted=place.get("display_name"),
        ),
        coordinate=Coordinate(
            latitude=float(place["lat"]),
            longitude=float(place["lon"]),
        ),
    )

# Search places using location name and details.
async def search_places(query: str) -> list[SearchResult]:
    params = {
        "q": query,
        "format": "jsonv2",
        "addressdetails": 1,
        "limit": 5,
    }

    data = await search_retriever("search", params)

    results = []

    for place in data:
        results.append(_to_search_result(place))

    return results

# Search places using geocode.
async def reverse_geocode(latitude: float, longitude: float) -> SearchResult:
    params = {
        "lat": latitude,
        "lon": longitude,
        "format": "jsonv2",
        "addressdetails": 1,
    }

    address = await search_retriever("reverse", params)

    result = _to_search_result(address)

    return result