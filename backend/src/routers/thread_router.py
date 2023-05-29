from typing import Optional
from src.application.thread_application import ThreadApplication
from fastapi import APIRouter, Query
# import sys
# sys.path.append('../../')

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
