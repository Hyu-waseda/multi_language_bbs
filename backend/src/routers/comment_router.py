from typing import Optional
from src.application.comment_application import CommentApplication
from fastapi import APIRouter, Query, Form, File, UploadFile, HTTPException
from fastapi.responses import FileResponse
from pydantic import BaseModel
import os
import uuid
import time
import shutil

router = APIRouter()

# アップロードディレクトリのベースパスを定義
BASE_DIR = os.path.abspath("uploads")

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
    max_size_kb = 2000  # 最大サイズを2000KBに設定

    if image:
        # 画像ファイルのみを処理
        if image.content_type.startswith("image/"):
            # 画像をメモリに読み込む
            image_data = await image.read()
            if len(image_data) > max_size_kb * 1024:
                # 画像サイズが2MBを超える場合、image_pathをNoneに設定
                image_path = None
            else:
                # スレッドIDごとのディレクトリを作成
                thread_dir = os.path.join("uploads", thread_id)
                os.makedirs(thread_dir, exist_ok=True)
                # ファイル名から拡張子を取得
                file_extension = os.path.splitext(image.filename)[1].lower()
                # ユニークなファイル名を生成
                unique_filename = f"{uuid.uuid4()}{file_extension}"
                image_path = os.path.join(thread_dir, unique_filename)
                with open(image_path, "wb") as buffer:
                    await image.seek(0)  # ファイルポインタを先頭に戻す
                    shutil.copyfileobj(image.file, buffer)


    # コメントデータの作成
    comment = {
        "thread_id": thread_id,
        "user_id": user_id,
        "user_name": user_name,
        "content": content,
        "language": language,
        "image_path": image_path
    }
    created_comment = comment_application.create_comment(comment)
    return created_comment

def delete_file_after_delay(file_path, delay=3):
    """指定された遅延時間後にファイルを削除する"""
    time.sleep(delay)
    if os.path.exists(file_path):
        os.remove(file_path)

@router.get("/api/{filename:path}")
async def get_image(filename: str):
    # filenameが"uploads/"から始まる場合、それを取り除く
    if filename.startswith("uploads/"):
        filename = filename[len("uploads/"):]
    
    # ファイルの絶対パスを構築
    file_path = os.path.abspath(os.path.join(BASE_DIR, filename))
    
    # パストラバーサルを防ぐため、ファイルパスがベースディレクトリ内にあることを確認
    if not file_path.startswith(BASE_DIR):
        raise HTTPException(status_code=403, detail="アクセスが禁止されています")
    
    # ファイルが存在しない場合は404エラーを返す
    if not os.path.exists(file_path):
        raise HTTPException(status_code=404, detail="画像が見つかりません")
    
    # 画像ファイルを返す
    return FileResponse(file_path)
