from modeltranslation.translator import register, TranslationOptions
from .models import Languages

@register(Languages)
class LanguagesTranslationOptions(TranslationOptions):
    fields = ('title',)
