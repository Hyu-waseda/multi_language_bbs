from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from routers import dummy_router

app = FastAPI()

# フロントとつなぐ時に使用する
origins = [
    "http://localhost:8080/temprature",
    "http://localhost:3000",
    "http://localhost",
    "http://localhost:8080",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(dummy_router.router)