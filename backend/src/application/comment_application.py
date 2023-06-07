from typing import Optional
from src.infrastructure.comment_infrastructure import CommentInfrastructure
from pydantic import BaseModel
from datetime import datetime
import pytz


class GetParams(BaseModel):
    thread_id: Optional[int]


class PostParams(BaseModel):
    thread_id: int
    user_name: str
    content: str
    user_id: int


class CommentApplication:
    def __init__(self):
        self.comment_infrastructure = CommentInfrastructure()

    # データベースから取得した結果を指定の形式に整形する関数
    def __format_comment_data(self, comments):
        res = [
            {
                "commentID": comment_data[0],
                "threadID": comment_data[1],
                "userID": comment_data[2],
                "userName": comment_data[3],
                "content": comment_data[4],
                "createdAt": comment_data[5],
                "updatedAt": comment_data[6],
                "likes": comment_data[7]
                
            }
            for comment_data in comments
        ]
        return res

    def get_comments(self, params: GetParams):
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
        return self.__format_comment_data(comments)

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
