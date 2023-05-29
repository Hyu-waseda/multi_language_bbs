from googletrans import Translator
from src.utils.translation.const import LANGUAGES

# 翻訳する文章
text = 'good evening. This is the code using googletrans.'
# 翻訳先の言語(const.pyを参照)
language_to_translate = "japanese"

def get_code_by_language_name(language_name):
    for language_code, lang_name in LANGUAGES.items():
        if lang_name == language_name:
            return language_code
    raise ValueError(f"No language code found for language name: {language_name}")

def translate(text, language_to_translate):
    print("text:" + text + ", language_to_translate:" + language_to_translate)
    translator = Translator()
    language_code_to_translate = get_code_by_language_name(language_to_translate)
    print(language_code_to_translate)
    translated_text = translator.translate(text, dest=language_code_to_translate)
    print(translated_text)
    return translated_text

## デバッグ用
# translator = Translator()
# language_code_to_translate = get_code_by_language_name(language_to_translate)
# translation = translator.translate(text, dest=language_code_to_translate)

# print(translation.text)