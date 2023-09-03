from fastapi import HTTPException
from src.utils.DatabaseManager import DatabaseManager


class ThreadInfrastructure:
    def __init__(self):
        self.database_manager = DatabaseManager()

    # 全てのスレッドを最新順に返す関数
    def fetch_all_threads_sorted_by_created_at(self):
        """
        全てのスレッドを作成日時の降順で取得する関数
        :return: スレッドのリスト
        """
        query = "SELECT * FROM Threads ORDER BY CreatedAt DESC;"
        try:
            res = self.database_manager.execute_query(query)
        except Exception as e:
            raise HTTPException(
                status_code=500, detail="データベースからスレッドを取得できませんでした。fetch_all_threads_sorted_by_created_at: " + str(e))
        return res
    
    def fetch_all_threads_sorted_by_updated_at(self):
        """
        全てのスレッドを更新日時の降順で取得する関数
        :return: スレッドのリスト
        """
        query = "SELECT * FROM Threads ORDER BY UpdatedAt DESC;"
        try:
            res = self.database_manager.execute_query(query)
        except Exception as e:
            raise HTTPException(
                status_code=500, detail="データベースからスレッドを取得できませんでした。fetch_all_threads_sorted_by_updated_at: " + str(e))
        return res

    def fetch_threads_by_offset_sorted_by_created_at(self, offset: int, count: int):
        """
        指定されたオフセットと件数でスレッドを作成日時の降順で取得する関数
        :param offset: オフセット値
        :param count: 取得する件数
        :return: スレッドのリスト
        """
        query = "SELECT * FROM Threads ORDER BY CreatedAt DESC LIMIT %s OFFSET %s;"
        params = (count, offset)
        try:
            res = self.database_manager.execute_query(query, params)
        except Exception as e:
            raise HTTPException(
                status_code=500, detail="データベースからスレッドを取得できませんでした。fetch_threads_by_offset_sorted_by_created_at: " + str(e))
        return res
    
    def fetch_threads_by_offset_sorted_by_updated_at(self, offset: int, count: int):
        """
        指定されたオフセットと件数でスレッドを更新日時の降順で取得する関数
        :param offset: オフセット値
        :param count: 取得する件数
        :return: スレッドのリスト
        """
        query = "SELECT * FROM Threads ORDER BY UpdatedAt DESC LIMIT %s OFFSET %s;"
        params = (count, offset)
        try:
            res = self.database_manager.execute_query(query, params)
        except Exception as e:
            raise HTTPException(
                status_code=500, detail="データベースからスレッドを取得できませんでした。fetch_threads_by_offset_sorted_by_updated_at: " + str(e))
        return res

    # 特定のスレッドをIDで取得する関数
    def fetch_thread_by_id(self, thread_id: str):
        """
        指定されたスレッドIDに一致するスレッドを取得する関数
        :param thread_id: スレッドのID
        :return: スレッドの情報
        """
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
        """
        スレッドの総数を取得する関数
        :return: スレッドの総数
        """
        query = "SELECT COUNT(*) FROM Threads;"
        try:
            res = self.database_manager.execute_query(query)
            return res[0][0]
        except Exception as e:
            raise HTTPException(
                status_code=500, detail="スレッドの総数を取得できませんでした。fetch_thread_count: " + str(e))
        
    # スレッドの更新日時を更新する関数
    def update_thread_updated_at(self, thread_id: int, updated_at: str):
        """
        指定されたスレッドIDのスレッドの更新日時を更新する関数
        :param thread_id: スレッドのID
        :param updated_at: 更新日時
        """
        query = """
            UPDATE Threads SET UpdatedAt = %s WHERE ThreadID = %s;
        """
        params = (updated_at, thread_id)
        try:
            self.database_manager.execute_query(query, params)
        except Exception as e:
            raise HTTPException(
                status_code=500, detail="スレッドの更新日時の更新に失敗しました。update_thread_updated_at: " + str(e))
        
    def create_thread(self, thread_data):
        query = """
            INSERT INTO Threads (Title, CreatedAt, UpdatedAt, UserID, UserName, Content, Language, Views, Likes, Tags, CategoryID, ImageURL)
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s);
        """


        params = (
            thread_data["Title"],
            thread_data["CreatedAt"],
            thread_data["UpdatedAt"],
            int(thread_data["UserID"]),
            thread_data["UserName"],
            thread_data["Content"],
            thread_data["Language"],
            int(thread_data["Views"]),
            int(thread_data["Likes"]),
            thread_data["Tags"],
            thread_data["CategoryID"],
            thread_data["ImageURL"],
        )

        try:
            self.database_manager.execute_query(query, params)
            res = thread_data
        except Exception as e:
            raise HTTPException(
                status_code=500, detail="スレッドの作成に失敗しました。create_thread: " + str(e))
        return res
