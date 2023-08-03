from enum import Enum
from typing import Optional
from src.enums.sort_option import SortOption
from src.application.thread_application import ThreadApplication
from fastapi import APIRouter, Path, Query

router = APIRouter()


@router.get("/thread")
async def get_thread(sort: SortOption = SortOption["new"], offset: Optional[int] = Query(0, description="取得するスレッドのオフセット数"), count: Optional[int] = Query(0, description="取得するスレッド数")):
    """
    スレッドを取得するAPI

    offset: 取得するスレッドのオフセット数（指定しない場合は最初から）
    """
    params = {"offset": offset, "count": count, "sort": sort}
    thread_application = ThreadApplication(params=params)
    res = thread_application.get_threads()
    return res


@router.get("/thread/count")
async def get_thread_count():
    """
    スレッドの総数を取得するAPI
    """
    thread_application = ThreadApplication(params={})
    res = thread_application.get_thread_count()
    return res


@router.get("/thread/{thread_id}")
async def get_specific_thread(thread_id: str = Path(..., description="取得するスレッドのID")):
    """
    特定のスレッドを取得するAPI

    thread_id: 取得するスレッドのID
    """
    params = {"thread_id": thread_id}
    thread_application = ThreadApplication(params=params)
    res = thread_application.get_specific_thread()
    return res

@router.post("/thread")
async def create_thread(
    title: str = Query(..., description="スレッドのタイトル"),
    user_id: int = Query(..., description="ユーザーID"),
    user_name: str = Query(..., description="ユーザー名"),
    content: str = Query(..., description="スレッドの内容"),
    language: str = Query(..., description="言語"),
):
    """
    スレッドを作成するAPI

    title: スレッドのタイトル
    user_id: ユーザーID
    user_name: ユーザー名
    content: スレッドの内容
    language: 言語
    """
    thread = {
        "title": title,
        "user_id": user_id,
        "user_name": user_name,
        "content": content,
        "language": language,
    }
    thread_application = ThreadApplication(thread)
    created_thread = thread_application.create_thread(thread)
    return created_thread