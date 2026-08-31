from fastapi import APIRouter
from app.services.valhalla import ValhallaService
from app.services.optimization.calculation import OptimizationService
from app.schemas.routing import (RouteRequest, RouteResponse)
from app.config import settings

router = APIRouter()

valhalla = ValhallaService(settings.valhalla_url)
optimization = OptimizationService(valhalla)

@router.post("/optimization", response_model=RouteResponse)
async def create_optimized_route(request: RouteRequest):
    result = await optimization.get_optimized_route(request)
    return result