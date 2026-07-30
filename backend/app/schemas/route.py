from pydantic import BaseModel
from search import Coordinate

class RouteRequest(BaseModel):
    origin: Coordinate
    destination: Coordinate
    