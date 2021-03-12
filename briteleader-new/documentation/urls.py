from rest_framework import routers
from django.conf.urls import url, include
from django.urls import path
from .views import *

app_name = 'documentation'
router = routers.DefaultRouter()


router.register(r'doc', DocumentationViewSet)
router.register(r'purchase', PurchaseListViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
