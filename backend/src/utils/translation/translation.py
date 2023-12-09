from googletrans import Translator
from src.utils.translation.const import LANGUAGES


def get_code_by_language_name(language_name):
    for language_code, lang_name in LANGUAGES.items():
        if lang_name == language_name:
            return language_code
    raise ValueError(
        f"No language code found for language name: {language_name}")


async def translate(text, language_code_to_translate):
    if text == None:
        return text
    translator = Translator()
    try:
        translated_text = translator.translate(
            text, dest=language_code_to_translate)
        return translated_text
    except Exception as e:
        print("翻訳中にエラーが発生しました:", e)
        translated_text = translator.translate(
            "このコメントは、適切に翻訳することができませんでした。", dest=language_code_to_translate)
        return translated_text

# デバッグ用
# # 翻訳する文章
# text = 'good evening. This is the code using googletrans.'
# # 翻訳先の言語(const.pyを参照)
# language_to_translate = "japanese"
# translator = Translator()
# language_code_to_translate = get_code_by_language_name(language_to_translate)
# translation = translator.translate(text, dest=language_code_to_translate)

# print(translation.text)
