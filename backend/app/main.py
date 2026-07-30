import uvicorn
from fastapi import FastAPI
from app.api import search, routing

app = FastAPI(title="En Route API")

app.include_router(search.router, prefix="/api")
app.include_router(routing.router, prefix="/api")

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)