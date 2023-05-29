# from application.dummy_application import Dummy_application
# from utils.translation.translation import translate
from src.utils.translation.translation import translate
from fastapi import APIRouter
import sys
# sys.path.append('../../')


router = APIRouter()

@router.post("/translate")
async def translate_text(text: str, target_language: str):
    result = translate(text, target_language)
    print("result:")
    print(result)

    # 翻訳結果を返す
    return {"translation": result.text}
