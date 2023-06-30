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

    # 指定されたオフセットのスレッドをスレッド数、最新順に返す関数
    def fetch_threads_by_offset(self, offset: int, count: int):
        query = "SELECT * FROM Threads ORDER BY CreatedAt DESC LIMIT %s OFFSET %s;"
        params = (count, offset)
        try:
            res = self.database_manager.execute_query(query, params)
        except Exception as e:
            raise HTTPException(
                status_code=500, detail="データベースからスレッドを取得できませんでした。fetch_threads_by_offset: " + str(e))
        return res

    # 特定のスレッドをIDで取得する関数

    def fetch_thread_by_id(self, thread_id: str):
        query = "SELECT * FROM Threads WHERE ThreadID = %s;"
        params = (thread_id,)
        try:
            res = self.database_manager.execute_query(query, params)
            if len(res) == 0:
                raise HTTPException(
                    status_code=404, detail="指定されたスレッドが見つかりませんでした。")
            return res[0]
        except Exception as e:
            raise HTTPException(
                status_code=500, detail="データベースからスレッドを取得できませんでした。fetch_thread_by_id: " + str(e))

    # スレッドの総数を取得する関数
    def fetch_thread_count(self):
        query = "SELECT COUNT(*) FROM Threads;"
        try:
            res = self.database_manager.execute_query(query)
            return res[0][0]
        except Exception as e:
            raise HTTPException(
                status_code=500, detail="スレッドの総数を取得できませんでした。fetch_thread_count: " + str(e))
        
    # スレッドの更新日時を更新する関数
    def update_thread_updated_at(self, thread_id: int, updated_at: str):
        query = """
            UPDATE Threads SET UpdatedAt = %s WHERE ThreadID = %s;
        """
        params = (updated_at, thread_id)
        try:
            self.database_manager.execute_query(query, params)
        except Exception as e:
            raise HTTPException(
                status_code=500, detail="スレッドの更新日時の更新に失敗しました。update_thread_updated_at: " + str(e))
