from rest_framework import routers
from django.conf.urls import url, include
from django.urls import path
from .views import *

app_name = 'bids'
router = routers.DefaultRouter()


router.register(r'bids', BidsViewSet )
urlpatterns = [
    path('', include(router.urls)),
]
