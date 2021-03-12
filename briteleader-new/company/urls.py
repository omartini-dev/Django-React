from rest_framework import routers
from django.conf.urls import url, include
from django.urls import path
from .views import *

app_name = 'company'
router = routers.DefaultRouter()


router.register(r'company', CompanyViewSet )
router.register(r'company_profile', CompanyProfileViewSet)
router.register(r'company_benefit', CompanyGeneralBenefitsViewSet)
router.register(r'docs_required', RequiredDocsViewSet)
router.register(r'job_required', JobRequirementsViewSet)
router.register(r'selection_process', SelectionProcessViewSet)
urlpatterns = [
    path('', include(router.urls)),
]
