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
    