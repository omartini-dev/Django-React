from rest_framework import routers
from django.conf.urls import url, include
from django.urls import path
from .views import *

app_name = 'articles'
router = routers.DefaultRouter()


router.register(r'list', ArticlesViewSet )
router.register(r'comments', CommentsViewSet)
urlpatterns = [
    path('', include(router.urls)),
]
