"""briteleader URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from django.conf.urls import url, include
from rest_framework.permissions import AllowAny
from drf_yasg.views import get_schema_view
from drf_yasg import openapi
from rest_framework_jwt.views import obtain_jwt_token
from rest_framework_jwt.views import refresh_jwt_token
from rest_framework_jwt.views import verify_jwt_token
from allauth.account.views import LoginView
from django.conf.urls.static import static
from .statics import MEDIA_ROOT, MEDIA_URL_PATH, MEDIA_URL
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

from rest_framework.response import Response
from rest_framework import schemas
from rest_framework.decorators import api_view, renderer_classes
from rest_framework import renderers
from fcm_django.api.rest_framework import FCMDeviceAuthorizedViewSet

from rest_framework.routers import DefaultRouter
from rest_framework.authtoken import views

fcm_devices_router = DefaultRouter()

fcm_devices_router = fcm_devices_router.register(r'devices', FCMDeviceAuthorizedViewSet)

@api_view()
@renderer_classes([renderers.CoreJSONRenderer])
def real_schema_view(request):
    generator = schemas.SchemaGenerator(title='Bookings API')
    return Response(generator.get_schema())

schema_view = get_schema_view (
   openapi.Info(
      title="BriteLeader API",
      default_version='v1',
      description="Api for links",
      terms_of_service="https://www.google.com/policies/terms/",
      contact=openapi.Contact(email="contact@snippets.local"),
      license=openapi.License(name="BSD License"),
   ),
   validators=['flex', 'ssv'],
   public=True,
   permission_classes=(AllowAny,),
)
jwt_url_patterns = [
    url('refresh/', refresh_jwt_token),
    url('verify/', verify_jwt_token),
    url('$', obtain_jwt_token),
    url(r'^token/$', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    url(r'^token/refresh/$', TokenRefreshView.as_view(), name='token_refresh'),
]

api_urlpatterns = [
    url('accounts/', include('allauth.urls')),
    url('rest-auth/', include('rest_auth.urls')),
    url('rest-auth/registration/', include('rest_auth.registration.urls')),    
    url('auth-jwt/', include(jwt_url_patterns)),
    url('myauth/', include('myauth.urls', namespace='myauth')),
    url(r'^api-token-auth/', views.obtain_auth_token),
    url(r'^devices?$', FCMDeviceAuthorizedViewSet.as_view({'post': 'create'}), name='create_fcm_device'),
    url(r'^swagger/normal', real_schema_view),
    url(r'^swagger(?P<format>\.json|\.yaml)$', schema_view.without_ui(cache_timeout=1), name='schema-json'),
    url(r'^swagger/$', schema_view.with_ui('swagger', cache_timeout=1), name='schema-swagger-ui'),
    url(r'^redoc/$', schema_view.with_ui('redoc', cache_timeout=1), name='schema-redoc'),
    url(r'^profile/', include('myuser.urls')),
    url(r'^pro/', include('professional.urls')),
    url(r'^art/', include('articles.urls')),
    url(r'^job/', include('jobs.urls')),
    url(r'^bid/', include('bids.urls')),
    url(r'^company/', include('company.urls')),
    url(r'^logbook/', include('logbook.urls')),
    url(r'^pay/', include('payment.urls')),
    url(r'^doc/', include('documentation.urls')),
]

auth_urls = [
    path("login", LoginView.as_view())
]

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(api_urlpatterns)),
    url(r'^', include('django.contrib.auth.urls')),
    path('', include('frontend.urls')),
    path('chat/', include('chat.urls')),
]


from django.conf import settings
from django.conf.urls.static import static

urlpatterns = urlpatterns + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)