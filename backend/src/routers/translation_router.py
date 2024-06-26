from src.utils.translation.translation import translate
from fastapi import APIRouter


router = APIRouter()


@router.post("/translate")
async def translate_text(text: str, target_language: str):
    result = await translate(text, target_language)
    print("result:")
    print(result)

    # 翻訳結果を返す
    return {"translation": result.text}
