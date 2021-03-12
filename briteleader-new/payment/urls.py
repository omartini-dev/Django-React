from django.urls import path
from django.conf.urls import url, include
from rest_framework import routers
from .views import *
app_name = 'payment'

urlpatterns = [
    path('setsubscribe', setsubscribe, name='setsubscribe'),
    path('buydoc', buydoc, name='buydoc'),
]