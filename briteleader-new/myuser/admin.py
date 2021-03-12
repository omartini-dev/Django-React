from django.contrib import admin
from .models import UserProfile, UserActivity, Languages, Newsletter
# Register your models here.

@admin.register(Languages)
class LanguagesSpokenAdmin(admin.ModelAdmin):
    list_display = [
        'title'
    ]

@admin.register(Newsletter)
class NewsletterAdmin(admin.ModelAdmin):
    list_display = (
        'id',
        'email',
        'country',
        'subscription_date'
    )
    search_fields = ['email']
    list_filter = ['country']


@admin.register(UserActivity)
class ProviderAdmin(admin.ModelAdmin):
    list_display = (
        'id',
        'user',
        'ip_address',
        'path',
        'method',
        'location_latitude',
        'location_longitude',
        'city',
        'body'
    )
    readonly_fields = ()
    search_fields = ['user__email']
    list_filter = ['city']

@admin.register(UserProfile)
class UserProfileAdmin(admin.ModelAdmin):
    list_display = (
        'user_email',
        'company_name',
        'phone_number',
        'city',
        'state',
        'zip_code',
        'country',

    )
    list_filter = ('city','state', 'country','company_name')
    search_fields = ['user__email']