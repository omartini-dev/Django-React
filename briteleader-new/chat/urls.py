from django.urls import path
from django.conf.urls import url, include
from rest_framework import routers
from .views import *
app_name = 'chat'
router = routers.DefaultRouter()

router.register(r'chat', ChatViewSet )
urlpatterns = [
    path('', include(router.urls)),
    path('listuser', listuser, name='listuser'),
    path('<str:room_name>/', room, name='room'),
]