from fastapi import HTTPException
from src.utils.DatabaseManager import DatabaseManager


class ThreadInfrastructure:
    def __init__(self):
        self.database_manager = DatabaseManager()

    # 全てのスレッドを最新順に返す関数
    def fetch_all_threads(self):
        query = "SELECT * FROM Threads ORDER BY CreatedAt DESC;"
        try:
            res = self.database_manager.execute_query(query)
        except Exception as e:
            raise HTTPException(
                status_code=500, detail="データベースからスレッドを取得できませんでした。fetch_all_threads: " + str(e))
        return res

    # 指定されたスレッド数のスレッドを最新順に返す関数
    def fetch_threads_by_count(self, count: int):
        query = "SELECT * FROM Threads ORDER BY CreatedAt DESC LIMIT %s;"
        params = (count,)
        try:
            res = self.database_manager.execute_query(query, params)
        except Exception as e:
            raise HTTPException(
                status_code=500, detail="データベースからスレッドを取得できませんでした。fetch_threads_by_count: " + str(e))
        return res
