from typing import Optional
from src.infrastructure.comment_infrastructure import CommentInfrastructure
from src.utils.translation.translation import translate
from pydantic import BaseModel
from datetime import datetime
import pytz
from typing import Dict
from datetime import datetime, timedelta

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
    expiration_time = datetime.now() + timedelta(days=1)
    if text not in translation_cache:
        translation_cache[text] = {}
    translation_cache[text][lang] = {
        "translation": translation,
        "expiration_time": expiration_time
    }

    return translation


class GetParams(BaseModel):
    thread_id: Optional[int]
    lang: Optional[str]


class PostParams(BaseModel):
    thread_id: int
    user_name: str
    content: str
    user_id: int


class CommentApplication:
    def __init__(self):
        self.comment_infrastructure = CommentInfrastructure()

    async def __format_comment_data(self, comments, lang):
        res = []
        for comment_data in comments:
            if lang == "original":
                text = comment_data[4]
            else:
                text = await translate_with_cache(comment_data[4], lang) if comment_data[4] else ""

            formatted_comment = {
                "commentID": comment_data[0],
                "threadID": comment_data[1],
                "userID": comment_data[2],
                "userName": comment_data[3],
                "content": text,
                "createdAt": comment_data[5],
                "updatedAt": comment_data[6],
                "likes": comment_data[7]
            }
            res.append(formatted_comment)

        return res

    async def get_comments(self, params: GetParams):
        """
        コメントを取得する関数

        :params: リクエストパラメータ
        :return: コメントのリスト
        """
        if params["thread_id"] is not None:
            comments = self.comment_infrastructure.fetch_comments_by_thread_id(
                params["thread_id"])
        else:
            comments = self.comment_infrastructure.fetch_all_comments()
        return await self.__format_comment_data(comments, params["lang"])

    def create_comment(self, params: PostParams):
        """
        コメントを作成する関数

        :params: リクエストパラメータ
        :return: 作成されたコメントの情報
        """
        now = datetime.now(pytz.utc)

        # 指定された形式にフォーマット
        formatted_time = now.strftime("%Y-%m-%d %H:%M:%S")
        new_comment = {
            "threadID": params["thread_id"],
            "userID": params["user_id"],
            "userName": params["user_name"],
            "content": params["content"],
            "createdAt": formatted_time,
            "updatedAt": formatted_time,
            "likes": 0,
        }
        res = self.comment_infrastructure.create_comment(new_comment)
        return res
