from typing import Optional
from src.infrastructure.thread_infrastructure import ThreadInfrastructure
from pydantic import BaseModel


class Params(BaseModel):
    count: Optional[int]


class ThreadApplication:
    def __init__(self, params: Params):
        self.params = params

    # スレッドを返す関数
    def get_threads(self):
        thread_infrastructure = ThreadInfrastructure()

        # スレッド数が指定されている場合、指定数のスレッドを返す
        if self.params["count"] is not None:
            res = thread_infrastructure.fetch_threads_by_count(
                self.params["count"])
        # スレッド数が指定されていない場合、全てのスレッドを返す
        else:
            res = thread_infrastructure.fetch_all_threads()

        return res
