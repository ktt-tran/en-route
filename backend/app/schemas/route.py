from pydantic import BaseModel
from coordinates import Coordinates

class RouteRequest(BaseModel):
    origin: Coordinates
    destination: Coordinates
    