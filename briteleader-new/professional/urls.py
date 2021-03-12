from rest_framework import routers
from django.conf.urls import url, include
from django.urls import path
from .views import *

app_name = 'pro'
router = routers.DefaultRouter()


router.register(r'professional', ProfessionalViewSet )
router.register(r'experience_profile', ExperienceProfileViewSet)
router.register(r'education_profile', EducationProfileViewSet)
router.register(r'competence_profile', CompetenceProfileViewSet)
urlpatterns = [
    path('', include(router.urls)),
    # url(r'^pdf/(?P<pk>[^/.]+)/', MakeProfilePDFView.as_view(), name='pdf'),
]
