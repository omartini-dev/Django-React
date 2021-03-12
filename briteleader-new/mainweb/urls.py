from django.conf.urls import url, include
from django.urls import path
from . import web_views

urlpatterns = [
    path('home', web_views.home.as_view(), name='home'),
]