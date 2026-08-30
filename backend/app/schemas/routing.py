from pydantic import BaseModel, Field
from enum import Enum
from .coordinates import Coordinates

class TransportMode(str, Enum):
    AUTO="auto"
    WALKING="walking"
    BICYCLING="bicycling"

class RouteRequest(BaseModel):
    locations: list[Coordinates] = Field(min_length=2)
    mode: TransportMode

class RouteLeg(BaseModel):
    from_location: Coordinates
    to_location: Coordinates
    distance_miles: float
    duration_seconds: float

class RouteResponse(BaseModel):
    fullRoute: list[Coordinates]
    distance_miles: float
    duration_seconds: float
    geometry: list[Coordinates]
    legs: list[RouteLeg]