from typing import Optional
from src.application.comment_application import CommentApplication
from fastapi import APIRouter, Query

router = APIRouter()


@router.get("/comment")
async def get_comment(thread_id: Optional[str] = Query(None, description="コメントを取得するスレッドID")):
    """
    コメントを取得するAPI

    thread_id: コメントを取得するスレッドID（指定しない場合は全てのコメント）
    """
    params = {"thread_id": thread_id}
    comment_application = CommentApplication(params=params)
    res = comment_application.get_comments()
    return res
