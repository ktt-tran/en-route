from fastapi import APIRouter
from app.services.geocoder import search_places

router = APIRouter()

@router.get("/search")
async def search(query: str):

    results = await search_places(query)

    return results