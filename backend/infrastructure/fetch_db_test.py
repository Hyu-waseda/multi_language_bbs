import mysql.connector
from dotenv import load_dotenv
import os

load_dotenv()  # .env ファイルを読み込む


class FetchDbTest:
    def execute_query(self, db, query):
        cursor = db.cursor()
        cursor.execute(query)
        result = cursor.fetchall()
        cursor.close()
        return result

    def fetch_db_test(self, query):
        # MySQLデータベースに接続する
        db = mysql.connector.connect(
            host="database",  # コンテナ名
            user=os.getenv("MYSQL_USER"),
            password=os.getenv("MYSQL_PASSWORD"),
            database=os.getenv("MYSQL_DATABASE")
        )

        res = self.execute_query(db, query)
        return res
