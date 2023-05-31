from fastapi import HTTPException
from src.utils.DatabaseManager import DatabaseManager


class CommentInfrastructure:
    def __init__(self):
        self.database_manager = DatabaseManager()

    # 全てのコメントを古い順に返す関数
    def fetch_all_comments(self):
        query = "SELECT * FROM Comments ORDER BY CreatedAt ASC;"
        try:
            res = self.database_manager.execute_query(query)
        except Exception as e:
            raise HTTPException(
                status_code=500, detail="データベースからコメントを取得できませんでした。fetch_all_comments: " + str(e))
        return res

    # 指定されたスレッドIDに関連するコメントを古い順に返す関数
    def fetch_comments_by_thread_id(self, thread_id: str):
        query = "SELECT * FROM Comments WHERE ThreadID = %s ORDER BY CreatedAt ASC;"
        params = (thread_id,)
        try:
            res = self.database_manager.execute_query(query, params)
        except Exception as e:
            raise HTTPException(
                status_code=500, detail="データベースからコメントを取得できませんでした。fetch_comments_by_thread_id: " + str(e))
        return res
