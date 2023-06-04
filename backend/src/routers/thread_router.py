from typing import Optional
from src.application.thread_application import ThreadApplication
from fastapi import APIRouter, Path, Query

router = APIRouter()


@router.get("/thread")
async def get_thread(count: Optional[int] = Query(None, description="取得するスレッド数")):
    """
    スレッドを取得するAPI

    count: 取得するスレッド数（指定しない場合は全てのスレッド）
    """
    params = {"count": count}
    thread_application = ThreadApplication(params=params)
    res = thread_application.get_threads()
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
