from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import dummy_router, translation_router, db_test_router

app = FastAPI()

# フロントとからのアクセスを許可(allow_originsに渡す)
origins = [
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(dummy_router.router)
app.include_router(translation_router.router)
app.include_router(db_test_router.router)
