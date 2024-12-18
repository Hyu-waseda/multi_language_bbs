from datetime import datetime, timedelta
from typing import Dict
from src.schemas.thread_schemas import CreateThreadParams, GetSpecificThreadParams, GetThreadParams

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


class ThreadApplication:
    async def __format_thread_data(self, threads, lang):
        res = []
        for thread_data in threads:
            if lang == "original":
                title = thread_data['Title']
                content = thread_data['Content']
            else:
                title = await translate_with_cache(thread_data['Title'], lang) if thread_data['Title'] else ""
                content = await translate_with_cache(thread_data['Content'], lang) if thread_data['Content'] else ""

            formatted_thread = {
                "threadID": thread_data['ThreadID'],
                "title": title,
                "createdAt": thread_data['CreatedAt'],
                "updatedAt": thread_data['UpdatedAt'],
                "userID": thread_data['UserID'],
                "userName": thread_data['UserName'],
                "content": content,
                "language": thread_data['Language'],
                "views": thread_data['Views'],
                "likes": thread_data['Likes'],
                "tags": thread_data['Tags'],
                "categoryID": thread_data['CategoryID'],
                "imageURL": thread_data['ImageURL']
            }
            res.append(formatted_thread)
        return res

    async def get_threads(self, params: GetThreadParams):
        """
        スレッドを取得する関数

        :param params: GetThreadParams
            - sort: スレッドのソートオプション
            - offset: 取得するスレッドの開始位置
            - count: 一度に取得するスレッドの最大数, 0を指定すると全スレッドを取得
            - lang: 取得するスレッドの言語

        :return: スレッドのリスト
        """
        thread_infrastructure = ThreadInfrastructure()

        if params.sort == SortOption.new:
            if params.count == 0:
                threads = thread_infrastructure.fetch_all_threads_sorted_by_created_at()
            else:
                threads = thread_infrastructure.fetch_threads_by_offset_sorted_by_created_at(
                    offset=params.offset, count=params.count)
        elif params.sort == SortOption.update:
            if params.count == 0:
                threads = thread_infrastructure.fetch_all_threads_sorted_by_updated_at()
            else:
                threads = thread_infrastructure.fetch_threads_by_offset_sorted_by_updated_at(
                    offset=params.offset, count=params.count)
        elif params.sort == SortOption.comment_count:
            if params.count == 0:
                threads = thread_infrastructure.fetch_all_threads_sorted_by_comment_count()
            else:
                threads = thread_infrastructure.fetch_threads_by_offset_sorted_by_comment_count(
                    offset=params.offset, count=params.count)
        res = await self.__format_thread_data(threads=threads, lang=params.lang)
        return res

    async def get_specific_thread(self, params: GetSpecificThreadParams):
        """
        特定のスレッドを取得する関数

        :param params: GetSpecificThreadParams
            - thread_id: 取得したいスレッドのID。
            - lang: 表示する言語（デフォルトは原文）

        :return: 指定されたIDを持つスレッドの詳細情報
        """
        thread_infrastructure = ThreadInfrastructure()
        thread_data = thread_infrastructure.fetch_thread_by_id(
            params.thread_id)
        res = await self.__format_thread_data(threads=[thread_data], lang=params.lang)
        return res[0]

    def get_thread_count(self):
        """
        スレッドの総数を取得する関数
        """
        thread_infrastructure = ThreadInfrastructure()
        thread_count = thread_infrastructure.fetch_thread_count()
        return thread_count

    def create_thread(self, params: CreateThreadParams):
        """
        スレッドを作成する関数

        :params params: CreateThreadParams
            - title: スレッドのタイトル
            - user_id: ユーザーID
            - user_name: ユーザー名
            - content: スレッドの内容
            - language: 言語

        :return: 作成されたスレッドの情報
        """
        now = datetime.now(pytz.utc)

        # 指定された形式にフォーマット
        formatted_time = now.strftime("%Y-%m-%d %H:%M:%S")
        new_thread = {
            "Title": params.title,
            "CreatedAt": formatted_time,
            "UpdatedAt": formatted_time,
            "UserID": params.user_id,
            "UserName": params.user_name,
            "Content": params.content,
            "Language": params.language,
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
