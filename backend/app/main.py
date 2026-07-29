import uvicorn
from fastapi import FastAPI
from app.routes import search

app = FastAPI(title="En Route API")

app.include_router(search.router)

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)