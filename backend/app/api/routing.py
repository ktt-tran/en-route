from fastapi import APIRouter
from app.services.valhalla import ValhallaService
from app.schemas.routing import (RouteRequest, RouteResponse)
from app.config import settings

router = APIRouter()

valhalla = ValhallaService(settings.valhalla_url)

@router.post("/routes", response_model=RouteResponse)
async def create_route(request: RouteRequest):
    result = await valhalla.get_route(
        origin=request.origin,
        destination=request.destination,
        mode=request.mode,
    )
    return result