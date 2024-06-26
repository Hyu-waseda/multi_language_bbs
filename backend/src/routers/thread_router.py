from typing import Optional
from src.schemas.thread_schemas import CreateThreadParams, GetSpecificThreadParams, GetThreadParams
from src.enums.sort_option import SortOption
from src.application.thread_application import ThreadApplication
from fastapi import APIRouter, Path, Query

router = APIRouter()


@router.get("/api/thread")
async def get_thread(sort: SortOption = SortOption["new"], offset: Optional[int] = Query(0, description="取得するスレッドのオフセット数"), count: Optional[int] = Query(0, description="取得するスレッド数"), lang: Optional[str] = Query("original", description="翻訳先言語")):
    """
    スレッドを取得するAPI

    offset: 取得するスレッドのオフセット数（指定しない場合は最初から）
    """

    params = GetThreadParams(offset=offset, count=count, sort=sort, lang=lang)
    thread_application = ThreadApplication()
    res = await thread_application.get_threads(params=params)
    return res


@router.get("/api/thread/count")
async def get_thread_count():
    """
    スレッドの総数を取得するAPI
    """
    thread_application = ThreadApplication()
    res = thread_application.get_thread_count()
    return res


@router.get("/api/thread/{thread_id}")
async def get_specific_thread(thread_id: str = Path(..., description="取得するスレッドのID"), lang: Optional[str] = Query("original", description="翻訳先言語")):
    """
    特定のスレッドを取得するAPI

    thread_id: 取得するスレッドのID
    """
    params = GetSpecificThreadParams(thread_id=int(thread_id), lang=lang)
    thread_application = ThreadApplication()
    res = await thread_application.get_specific_thread(params=params)
    return res


@router.post("/api/thread")
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
    params = CreateThreadParams(title=title, user_id=user_id,
                                user_name=user_name, content=content, language=language)
    thread_application = ThreadApplication()
    created_thread = thread_application.create_thread(params=params)
    return created_thread
