from fastapi import APIRouter
from app.schemas.route import RouteRequest
from app.services.valhalla import ValhallaService
from app.config import settings

router = APIRouter()

valhalla = ValhallaService(settings.valhalla_url)

@router.post("/routes")
async def route(request: RouteRequest):
    result = await valhalla.create_route(
        request.origin,
        request.destination,
        request.mode,

    )

    return result