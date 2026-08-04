from pydantic import BaseModel
from enum import Enum
from .coordinates import Coordinates

class TransportationMode(str, Enum):
    AUTO="auto"
    WALKING="walking"
    BICYCLING="bicycling"

class RouteRequest(BaseModel):
    origin: Coordinates
    destination: Coordinates
    mode: TransportationMode

class Maneuver(BaseModel):
    instruction: str
    distance_miles: float
    duration_seconds: float

class RouteResponse(BaseModel):
    distance_miles: float
    duration_seconds: float
    geometry: list[Coordinates]
    maneuvers: list[Maneuver]