from application.db_test_application import Db_test_application
from fastapi import APIRouter
import sys
sys.path.append('../../')


router = APIRouter()


@router.get("/db_test")
async def db_test(query: str):
    db_test_application = Db_test_application()
    res = db_test_application.get_db_test(query)
    return res
