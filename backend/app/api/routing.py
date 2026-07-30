from fastapi import APIRouter
from app.schemas.route import RouteRequest

router = APIRouter()

valhalla = ValhallaService("http://localhost:8002")

@router.post("/routes")
async def create_route(request: RouteRequest):
    result = await valhalla.route(
        request.origin,
        request.destination,
    )

    return result