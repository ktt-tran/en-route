from pydantic import BaseModel

class Coordinate(BaseModel):
    latitude: float
    longitude: float


class Address(BaseModel):
    street: str | None = None
    city: str | None = None
    state: str | None = None
    postalCode: str | None = None
    country: str | None = None
    formatted: str | None = None


class SearchResult(BaseModel):
    name: str
    address: Address
    coordinate: Coordinate