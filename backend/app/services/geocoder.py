from app.schemas.search import SearchResult, Address, Coordinate

async def search_places(query: str) -> list[SearchResult]:
    """
    Search for places matching the query.

    This function will later call Photon/Pelias and convert
    the response into SearchResult objects.
    """

    return [
        SearchResult(
            name="Test Location",
            address=Address(
                formatted="123 Test Street"
            ),
            coordinate=Coordinate(
                latitude=39.0,
                longitude=-75.0
            )
        )
    ]

    raise NotImplementedError()

async def query_to_Geocode(query: str) -> list[SearchResult]:

    raise NotImplementedError()

async def geocode_to_Address(latitude: float, longitude: float) -> list[SearchResult]:

    raise NotImplementedError()