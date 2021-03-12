from django.contrib import admin
from .models import *
# Register your models here.

@admin.register(Professional)
class ProfessionalAdmin(admin.ModelAdmin):
    list_display = [
        'user'
    ]

@admin.register(EducationProfile)
class EducationProfileAdmin(admin.ModelAdmin):
    list_display = [
        'user'
    ]


@admin.register(ExperienceProfile)
class ExperienceProfileAdmin(admin.ModelAdmin):
    list_display = [
        'user'
    ]

@admin.register(CompetenceProfile)
class CompetenceProfileAdmin(admin.ModelAdmin):
    list_display = [
        'user'
    ]