from typing import Optional
from src.application.comment_application import CommentApplication
from fastapi import APIRouter, Query
from pydantic import BaseModel

router = APIRouter()


@router.get("/comment")
async def get_comment(thread_id: Optional[str] = Query(None, description="コメントを取得するスレッドID")):
    """
    コメントを取得するAPI

    thread_id: コメントを取得するスレッドID（指定しない場合は全てのコメント）
    """
    comment_application = CommentApplication()
    params = {"thread_id": thread_id}
    res = comment_application.get_comments(params=params)
    return res


class CommentCreateRequest(BaseModel):
    thread_id: int
    user_id: int
    content: str
    user_name: str


@router.post("/comment")
async def create_comment(
    thread_id: int = Query(..., description="スレッドID"),
    user_id: int = Query(..., description="ユーザーID"),
    content: str = Query(..., description="コメントの内容"),
    user_name: str = Query(..., description="ユーザー名")
):
    """
    コメントを作成するAPI

    thread_id: スレッドID
    user_id: ユーザーID
    content: コメントの内容
    user_name: ユーザー名
    """
    comment_application = CommentApplication()
    comment = {
        "thread_id": thread_id,
        "user_id": user_id,
        "content": content,
        "user_name": user_name
    }
    created_comment = comment_application.create_comment(comment)
    return created_comment
