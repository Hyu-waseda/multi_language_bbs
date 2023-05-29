import mysql.connector
import os


class DatabaseManager:
    def __init__(self):
        self.host = "database"
        self.user = os.getenv("MYSQL_USER")
        self.password = os.getenv("MYSQL_PASSWORD")
        self.database = os.getenv("MYSQL_DATABASE")
        self.db = mysql.connector.connect(
            host=self.host,
            user=self.user,
            password=self.password,
            database=self.database
        )

    # クエリを実行する関数
    def execute_query(self, query, params=None):
        cursor = self.db.cursor()
        cursor.execute(query, params)
        result = cursor.fetchall()
        cursor.close()
        return result
