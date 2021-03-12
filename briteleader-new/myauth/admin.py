from django.contrib import admin
from .models import *
from allauth.models import *
# Register your models here.




@admin.register(OAuth)
class OAuthAdmin(admin.ModelAdmin):
    list_display = (
        'name',
        'clientId',
        'accessTokenUri',
        'authorizationUri',
        'redirectUri',
        'scopes',

    )