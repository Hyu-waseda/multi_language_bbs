from typing import Optional
from src.enums.sort_option import SortOption
from pydantic import BaseModel


class GetThreadParams(BaseModel):
    sort: SortOption
    offset: Optional[int]
    count: Optional[int]
    lang: Optional[str]


class GetSpecificThreadParams(BaseModel):
    thread_id: Optional[int]
    lang: Optional[str]


class CreateThreadParams(BaseModel):
    title: str
    user_id: int
    user_name: str
    content: str
    language: str
