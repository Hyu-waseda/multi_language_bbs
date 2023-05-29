from typing import Optional
from src.infrastructure.thread_infrastructure import ThreadInfrastructure
from pydantic import BaseModel


class Params(BaseModel):
    count: Optional[int]


class ThreadApplication:
    def __init__(self, params: Params):
        self.params = params

    # データベースから取得した結果を指定の形式に整形する関数
    def __format_thread_data(self, threads):
        res = [
            {
                "threadID": thread_data[0],
                "title": thread_data[1],
                "createdAt": thread_data[2],
                "updatedAt": thread_data[3],
                "userID": thread_data[4],
                "content": thread_data[5],
                "language": thread_data[6],
                "views": thread_data[7],
                "likes": thread_data[8],
                "tags": thread_data[9],
                "categoryID": thread_data[10],
                "imageURL": thread_data[11]
            }
            for thread_data in threads
        ]
        return res

    def get_threads(self):
        """
        スレッドを取得する関数

        :return: スレッドのリスト
        """
        thread_infrastructure = ThreadInfrastructure()

        # スレッド数が指定されている場合、指定数のスレッドを返す
        if self.params["count"] is not None:
            threads = thread_infrastructure.fetch_threads_by_count(
                self.params["count"])
            res = self.__format_thread_data(threads=threads)
        # スレッド数が指定されていない場合、全てのスレッドを返す
        else:
            threads = thread_infrastructure.fetch_all_threads()
            res = self.__format_thread_data(threads=threads)
        return res
