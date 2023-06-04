from fastapi import HTTPException
from src.utils.DatabaseManager import DatabaseManager


class CommentInfrastructure:
    def __init__(self):
        self.database_manager = DatabaseManager()

    def fetch_all_comments(self):
        query = """
            SELECT c.*, u.Username
            FROM Comments c
            JOIN Users u ON c.UserID = u.UserID
            ORDER BY c.CreatedAt ASC;
        """
        try:
            res = self.database_manager.execute_query(query)
        except Exception as e:
            raise HTTPException(
                status_code=500, detail="データベースからコメントを取得できませんでした。fetch_all_comments: " + str(e))
        return res

    def fetch_comments_by_thread_id(self, thread_id: str):
        query = """
            SELECT c.*, u.Username
            FROM Comments c
            JOIN Users u ON c.UserID = u.UserID
            WHERE c.ThreadID = %s
            ORDER BY c.CreatedAt ASC;
        """
        params = (thread_id,)
        try:
            res = self.database_manager.execute_query(query, params)
        except Exception as e:
            raise HTTPException(
                status_code=500, detail="データベースからコメントを取得できませんでした。fetch_comments_by_thread_id: " + str(e))
        return res
