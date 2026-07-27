from fastapi import APIRouter

from app.schemas.search import SearchResult
from app.services.geocoder import search_places

router = APIRouter(prefix="/search", tags=["Search"])


@router.get("", response_model=list[SearchResult])
async def search(query: str):

    return await search_places(query)