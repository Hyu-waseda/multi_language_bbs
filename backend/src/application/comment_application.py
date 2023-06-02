from typing import Optional
from src.infrastructure.comment_infrastructure import CommentInfrastructure
from pydantic import BaseModel


class Params(BaseModel):
    thread_id: Optional[int]


class CommentApplication:
    def __init__(self, params: Params):
        self.params = params

    # データベースから取得した結果を指定の形式に整形する関数
    def __format_comment_data(self, comments):
        res = [
            {
                "commentID": comment_data[0],
                "threadID": comment_data[1],
                "userID": comment_data[2],
                "content": comment_data[3],
                "createdAt": comment_data[4],
                "updatedAt": comment_data[5],
                "likes": comment_data[6],
                "userName": comment_data[7]
            }
            for comment_data in comments
        ]
        return res

    def get_comments(self):
        """
        コメントを取得する関数

        :return: コメントのリスト
        """
        comment_infrastructure = CommentInfrastructure()

        # スレッドIDが指定されている場合、そのスレッドに関連するコメントを返す
        if self.params["thread_id"] is not None:
            comments = comment_infrastructure.fetch_comments_by_thread_id(
                self.params["thread_id"])
            res = self.__format_comment_data(comments=comments)
        # スレッドIDが指定されていない場合、全てのコメントを返す
        else:
            comments = comment_infrastructure.fetch_all_comments()
            res = self.__format_comment_data(comments=comments)
        return res
