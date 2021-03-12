from rest_framework import routers
from django.conf.urls import url, include
from django.urls import path
from .views import *

app_name = 'profile'
router = routers.DefaultRouter()


router.register(r'profile', ProfileViewSet)
router.register(r'contact-us', ContactUsView)
router.register(r'languages', LanguagesViewSet)
router.register(r'newsletter', NewsletterViewSet)
urlpatterns = [
    path('', include(router.urls)),
]
