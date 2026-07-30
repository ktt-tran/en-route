from fastapi import APIRouter
from app.services.geocoder import search_places, reverse_geocode

router = APIRouter()

@router.get("/search")
async def search(query: str):

    results = await search_places(query)

    return results

@router.get("/reverse")
async def reverse(latitude: float, longitude: float):

    results = await reverse_geocode(latitude, longitude)

    return results