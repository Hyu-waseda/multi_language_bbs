# from application.dummy_application import Dummy_application
from src.application.dummy_application import Dummy_application
from fastapi import APIRouter
import sys
# sys.path.append('../../')


router = APIRouter()


@router.get("/dummy")
async def get_dummy():
    print("router")
    dummy_application = dummy_application()
    dummy = dummy_application.get_dummy()
    return dummy
