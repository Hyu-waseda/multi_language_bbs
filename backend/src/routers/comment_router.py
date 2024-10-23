from typing import Optional
from src.application.comment_application import CommentApplication
from fastapi import APIRouter, Query, Form, File, UploadFile
from pydantic import BaseModel
import os

router = APIRouter()


@router.get("/api/comment")
async def get_comment(thread_id: Optional[str] = Query(None, description="コメントを取得するスレッドID"),
                      lang: Optional[str] = Query("original", description="翻訳先言語")):
    """
    コメントを取得するAPI

    thread_id: コメントを取得するスレッドID（指定しない場合は全てのコメント）
    """
    comment_application = CommentApplication()
    params = {"thread_id": thread_id, "lang": lang}
    res = await comment_application.get_comments(params=params)
    return res


class CommentCreateRequest(BaseModel):
    thread_id: int
    user_id: int
    content: str
    user_name: str


@router.post("/api/comment")
async def create_comment(
    thread_id: str = Form(..., description="スレッドID"),
    user_id: str = Form(..., description="ユーザーID"),
    user_name: Optional[str] = Form(None, description="ユーザー名"),
    content: str = Form(..., description="コメントの内容"),
    language: str = Form(..., description="コメント時の言語"),
    image: Optional[UploadFile] = File(None, description="添付画像")
):
    comment_application = CommentApplication()
    image_path = None

    if image:
        # 画像を保存するディレクトリを作成
        os.makedirs("uploads", exist_ok=True)
        # 画像を保存する処理
        image_path = f"uploads/{image.filename}"
        with open(image_path, "wb") as buffer:
            buffer.write(await image.read())

    # コメントデータの作成
    comment = {
        "thread_id": thread_id,
        "user_id": user_id,
        "user_name": user_name,
        "content": content,
        "language": language,
        "image_path": image_path
    }
    print(comment)
    created_comment = comment_application.create_comment(comment)  # コメントを作成
    return created_comment  # 作成されたコメントを返す
