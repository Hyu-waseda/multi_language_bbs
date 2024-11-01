from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from src.routers import translation_router, db_test_router, thread_router, comment_router

app = FastAPI()

# "uploads"ディレクトリを"/uploads"パスで提供
app.mount("/uploads", StaticFiles(directory="uploads"), name="uploads")

# アクセス許可する先
# TODO: 公開ドメインに変更する必要あり
# origins = [
#     "http://localhost:3000",
#     "http://www.waseda-nishimura.org/api",
#     "http://www.waseda-nishimura.org",
#     "http://backend:8080",
#     # "http://localhost:3000/thread",
# ]

app.add_middleware(
    CORSMiddleware,
    # allow_origins=origins,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(translation_router.router)
app.include_router(db_test_router.router)
app.include_router(thread_router.router)
app.include_router(comment_router.router)
