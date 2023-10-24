from datetime import datetime, timedelta
from typing import Optional, Dict

import pytz
from src.enums.sort_option import SortOption
from src.infrastructure.thread_infrastructure import ThreadInfrastructure
from src.utils.translation.translation import translate
from pydantic import BaseModel

# キャッシュを保持する辞書型の変数
translation_cache: Dict[str, Dict[str, str]] = {}


async def translate_with_cache(text: str, lang: str) -> str:
    # キャッシュに翻訳結果が存在する場合はキャッシュから取得
    if text in translation_cache and lang in translation_cache[text]:
        # キャッシュの有効期限をチェック
        cached_translation = translation_cache[text][lang]
        expiration_time = cached_translation["expiration_time"]
        if datetime.now() < expiration_time:
            return cached_translation["translation"]

    # キャッシュに翻訳結果が存在しない場合はAPIを呼び出して翻訳
    translated_content = await translate(text, lang)
    translation = translated_content.text if translated_content else ""

    # キャッシュに翻訳結果を保存
    expiration_time = datetime.now() + timedelta(days=90)
    if text not in translation_cache:
        translation_cache[text] = {}
    translation_cache[text][lang] = {
        "translation": translation,
        "expiration_time": expiration_time
    }

    return translation


class Params(BaseModel):
    offset: Optional[int]
    count: Optional[int]
    thread_id: Optional[int]
    sort: Optional[SortOption]
    title: Optional[str]
    user_id: Optional[str]
    user_name: Optional[str]
    content: Optional[str]
    lang: Optional[str]


class PostParams(BaseModel):
    title: str
    user_id: int
    user_name: str
    content: str
    language: str


class ThreadApplication:
    def __init__(self, params: Params):
        self.params = params

    async def __format_thread_data(self, threads, lang):
        res = []
        for thread_data in threads:
            if lang == "original":
                title = thread_data[1]
                content = thread_data[6]
            else:
                title = await translate_with_cache(thread_data[1], lang) if thread_data[1] else ""
                content = await translate_with_cache(thread_data[6], lang) if thread_data[6] else ""

            formatted_thread = {
                "threadID": thread_data[0],
                "title": title,
                "createdAt": thread_data[2],
                "updatedAt": thread_data[3],
                "userID": thread_data[4],
                "userName": thread_data[5],
                "content": content,
                "language": thread_data[7],
                "views": thread_data[8],
                "likes": thread_data[9],
                "tags": thread_data[10],
                "categoryID": thread_data[11],
                "imageURL": thread_data[12]
            }
            res.append(formatted_thread)
        return res

    async def get_threads(self):
        """
        スレッドを取得する関数

        :return: スレッドのリスト
        """
        thread_infrastructure = ThreadInfrastructure()

        if self.params["sort"] == SortOption.new:
            if self.params["count"] == 0:
                threads = thread_infrastructure.fetch_all_threads_sorted_by_created_at()
            else:
                threads = thread_infrastructure.fetch_threads_by_offset_sorted_by_created_at(
                    offset=self.params["offset"], count=self.params["count"])
        elif self.params["sort"] == SortOption.update:
            if self.params["count"] == 0:
                threads = thread_infrastructure.fetch_all_threads_sorted_by_updated_at()
            else:
                threads = thread_infrastructure.fetch_threads_by_offset_sorted_by_updated_at(
                    offset=self.params["offset"], count=self.params["count"])

        res = await self.__format_thread_data(threads=threads, lang=self.params["lang"])
        return res

    async def get_specific_thread(self):
        """
        特定のスレッドを取得する関数

        :param thread_id: 取得するスレッドのID
        :return: 特定のスレッドの情報
        """
        thread_infrastructure = ThreadInfrastructure()
        thread_data = thread_infrastructure.fetch_thread_by_id(
            self.params["thread_id"])
        res = await self.__format_thread_data(threads=[thread_data], lang=self.params["lang"])
        return res

    def get_thread_count(self):
        """
        スレッドの総数を取得する関数
        """
        thread_infrastructure = ThreadInfrastructure()
        thread_count = thread_infrastructure.fetch_thread_count()
        return thread_count

    def create_thread(self, params: PostParams):
        """
        スレッドを作成する関数

        :params: リクエストパラメータ
        :return: 作成されたスレッドの情報
        """
        now = datetime.now(pytz.utc)

        # 指定された形式にフォーマット
        formatted_time = now.strftime("%Y-%m-%d %H:%M:%S")
        new_thread = {
            "Title": params["title"],
            "CreatedAt": formatted_time,
            "UpdatedAt": formatted_time,
            "UserID": params["user_id"],
            "UserName": params["user_name"],
            "Content": params["content"],
            "Language": params["language"],
            "Views": 0,
            "Likes": 0,
            "Tags": "",
            "CategoryID": 0,
            "ImageURL": "",
        }
        thread_infrastructure = ThreadInfrastructure()
        res = thread_infrastructure.create_thread(
            thread_data=new_thread)

        return res
