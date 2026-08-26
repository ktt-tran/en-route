from pydantic import BaseModel
from .coordinates import Coordinates

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
    coordinates: Coordinates