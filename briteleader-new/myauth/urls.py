from rest_framework import routers
from django.conf.urls import url, include
from django.urls import path
from .views import *
# from allauth.socialaccount.providers.openid.urls import urlpatterns as openid_urls
from . import web_views

app_name = 'auth'
router = routers.DefaultRouter()
router.register(r'providers', OAuthViewSet)

urlpatterns = [
    path(r'provider/login/<slug:provider>', OAuthLogin.as_view(), name='login'),
    path(r'login', Login.as_view()),
    # path('<int:question_id>/vote/', web_views.vote, name='vote'),

    url(r'', include(router.urls)),
]