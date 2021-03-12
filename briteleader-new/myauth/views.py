from django.shortcuts import render
from django.utils.translation import gettext as _
from rest_framework import viewsets
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
from .models import OAuth
from .serializers import OAuthSerializer
from django.views.decorators.debug import sensitive_post_parameters
from allauth.account.views import LoginView
from pydoc import locate
import briteleader.settings as app_settings
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from myuser.models import UserProfile
from myuser.serializers import UserProfileSerializer
# Create your views here.

from rest_auth.registration.views import SocialLoginView


sensitive_post_parameters_m = method_decorator(
    sensitive_post_parameters('password', 'password1', 'password2'))


@method_decorator(csrf_exempt, name='dispatch')
class OAuthLogin(SocialLoginView):
    #adapter_class = GoogleOAuth2Adapter
    """
    Login with OAuth

    An api view for converting oauth token to access token
    """
    @sensitive_post_parameters_m
    def dispatch(self, request, *args, **kwargs):
        adapter_class = locate(app_settings.SOCIALACCOUNT_PROVIDERS_ADAPTERS[kwargs['provider']])
        self.adapter_class = adapter_class
        return super(OAuthLogin, self).dispatch(request, *args, **kwargs)


class OAuthViewSet(viewsets.ReadOnlyModelViewSet):
    """
    list:
        Retrieve list of supported OAuth providers

        Retrieve the list of supported OAuth providers
    retrieve:
        Retrieve an OAuth provider

        Retrieve the required data for frontend configuration 
        of a single OAuth provider.
    """
    queryset = OAuth.objects.all()
    serializer_class = OAuthSerializer
    model_class = OAuth

class Login(ObtainAuthToken):

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data,
                                           context={'request': request})
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        obj = UserProfile.objects.get(user=user)
        profile = UserProfileSerializer(obj).data
        token, created = Token.objects.get_or_create(user=user)
        return Response({
            'token': token.key,
            'user_id': user.pk,
            'email': user.email,
            'profile':profile
        })