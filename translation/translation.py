from googletrans import Translator
from const import LANGUAGES


def get_code_by_name(language_name):
    for lang in LANGUAGES:
        if lang["name"] == language_name:
            return lang["code"]
    return None


translator = Translator()
src = 'good evening. This is the code using googletrans.'
language_to_translate = "Japanese"
code_to_translate = get_code_by_name(language_to_translate)
translation = translator.translate(src, dest=code_to_translate)

print(translation.text)
