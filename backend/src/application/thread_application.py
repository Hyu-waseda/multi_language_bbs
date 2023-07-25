from typing import Optional
from src.enums.sort_option import SortOption
from src.infrastructure.thread_infrastructure import ThreadInfrastructure
from pydantic import BaseModel


class Params(BaseModel):
    offset: Optional[int]
    count: Optional[int]
    thread_id: Optional[int]
    sort: SortOption


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
                "userName": thread_data[5],
                "content": thread_data[6],
                "language": thread_data[7],
                "views": thread_data[8],
                "likes": thread_data[9],
                "tags": thread_data[10],
                "categoryID": thread_data[11],
                "imageURL": thread_data[12]
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

        res = self.__format_thread_data(threads=threads)
        return res

    def get_specific_thread(self):
        """
        特定のスレッドを取得する関数

        :param thread_id: 取得するスレッドのID
        :return: 特定のスレッドの情報
        """
        thread_infrastructure = ThreadInfrastructure()
        thread_data = thread_infrastructure.fetch_thread_by_id(
            self.params["thread_id"])
        res = self.__format_thread_data(threads=[thread_data])
        return res

    def get_thread_count(self):
        """
        スレッドの総数を取得する関数
        """
        thread_infrastructure = ThreadInfrastructure()
        thread_count = thread_infrastructure.fetch_thread_count()
        return thread_count
