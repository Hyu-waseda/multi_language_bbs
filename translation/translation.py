from googletrans import Translator

translator = Translator()
translation = translator.translate('good evening. This is the code using googletrans.', dest='ja')
print(translation.text)
