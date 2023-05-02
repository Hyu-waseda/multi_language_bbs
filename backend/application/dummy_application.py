from infrastructure.fetch_dummy import FetchDummy


class Dummy_application:
    def __init__(self):
        self.dummy = FetchDummy()

    def get_dummy(self):
        return self.dummy.fetch_dummy()
