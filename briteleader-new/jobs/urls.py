from rest_framework import routers
from django.conf.urls import url, include
from django.urls import path
from .views import *

app_name = 'jobs'
router = routers.DefaultRouter()


router.register(r'jobs', JobsViewSet )
urlpatterns = [
    path('', include(router.urls)),
]
