from fastapi import APIRouter
from app.services.valhalla import ValhallaService
from app.schemas.routing import (RouteRequest, RouteResponse)
from app.config import settings

router = APIRouter()

valhalla = ValhallaService(settings.valhalla_url)

@router.post("/route", response_model=RouteResponse)
async def create_route(request: RouteRequest):
    result = await valhalla.get_route(request)
    return result