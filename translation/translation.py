from googletrans import Translator
from const import LANGUAGES

def get_code_by_name(language_name):
    for lang in LANGUAGES:
        if lang["name"] == language_name:
            return lang["code"]
    return None

translator = Translator()
language="Japanese"
# 翻訳先の言語
dest=get_code_by_name(language)
translation = translator.translate('good evening. This is the code using googletrans.', dest=dest)
print(translation.text)
