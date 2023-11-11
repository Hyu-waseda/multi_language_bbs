from fastapi import HTTPException
from src.utils.DatabaseManager import DatabaseManager


class CommentInfrastructure:
    def __init__(self):
        self.database_manager = DatabaseManager()

    def fetch_all_comments(self):
        query = """
            SELECT *
            FROM Comments
            ORDER BY CreatedAt ASC;
        """
        try:
            res = self.database_manager.execute_query(query)
        except Exception as e:
            raise HTTPException(
                status_code=500, detail="データベースからコメントを取得できませんでした。fetch_all_comments: " + str(e))
        return res

    def fetch_comments_by_thread_id(self, thread_id: str):
        # TODO: Userテーブルは消す
        query = """
            SELECT *
            FROM Comments
            WHERE ThreadID = %s
            ORDER BY CreatedAt ASC;
        """
        params = (thread_id,)
        try:
            res = self.database_manager.execute_query(query, params)
        except Exception as e:
            raise HTTPException(
                status_code=500, detail="データベースからコメントを取得できませんでした。fetch_comments_by_thread_id: " + str(e))
        return res

    def create_comment(self, comment_data):
        # TODO: UserNameの登録, UserIdの削除
        query = """
            INSERT INTO Comments (ThreadID, UserID, UserName, Content, CreatedAt, UpdatedAt, Language)
            VALUES (%s, %s, %s, %s, %s, %s, %s);
        """

        params = (
            int(comment_data["threadID"]),
            int(comment_data["userID"]),
            comment_data["userName"],
            comment_data["content"],
            comment_data["createdAt"],
            comment_data["updatedAt"],
            comment_data["language"]
        )
        try:
            self.database_manager.execute_query(query, params)
            res = comment_data
        except Exception as e:
            raise HTTPException(
                status_code=500, detail="コメントの作成に失敗しました。create_comment: " + str(e))
        return res
