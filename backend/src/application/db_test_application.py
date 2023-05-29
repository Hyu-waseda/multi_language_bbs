from src.infrastructure.fetch_db_test import FetchDbTest


class Db_test_application:
    def __init__(self):
        self.db_test = FetchDbTest()

    def get_db_test(self, query):
        return self.db_test.fetch_db_test(query)
