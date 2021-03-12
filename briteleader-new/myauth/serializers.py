from rest_framework import serializers
from .models import OAuth
from myuser.models import UserProfile
from rest_auth.registration.serializers import RegisterSerializer as RestAuthRegisterSerializer
from myuser.serializers import UserProfileSerializer
from drf_yasg.utils import swagger_serializer_method
from myuser.serializers import UserProfileSerializer
from professional.models import *
from company.models import *

class OAuthSerializer(serializers.ModelSerializer):
    scopes = serializers.SerializerMethodField()
    loginpath = serializers.SerializerMethodField()
    auth_data = serializers.SerializerMethodField()

    class Meta:
        model = OAuth
        fields = '__all__'

    def get_scopes(self, obj):
        return obj.scopes.split(',')

    def get_auth_data(self, obj):
        a = {
            'clientId': obj.clientId,
            'accessTokenUri': obj.accessTokenUri,
            'state': obj.state,
            'authorizationUri': obj.authorizationUri,
            'redirectUri': obj.redirectUri,
            'scopes': self.get_scopes(obj),
            'responseType': obj.responseType
        }
        return a


    def get_loginpath(self, obj):
        return obj.loginpath




from allauth.account import app_settings as allauth_settings



class RegisterSerializer(RestAuthRegisterSerializer):
    email = serializers.EmailField(required=allauth_settings.EMAIL_REQUIRED)
    first_name = serializers.CharField(required=True, write_only=True)
    last_name = serializers.CharField(required=False, write_only=True)
    password1 = serializers.CharField(required=True, write_only=True)
    password2 = serializers.CharField(required=True, write_only=True)
    username = None
    country = serializers.CharField( write_only=True)
    phone_no = serializers.CharField(required=False, write_only=True)
    position = serializers.CharField(required=True, write_only=True)
    is_professional = serializers.BooleanField(default=False, write_only=True)
    is_company = serializers.BooleanField(default=False, write_only=True)
    type = serializers.CharField(default='I', write_only=True)

    class Meta:
        fields = ('email', 'first_name', 'last_name', 'password1', 'password2', 'profile')

    def get_cleaned_data(self):
        return {
            'first_name': self.validated_data.get('first_name', ''),
            'last_name': self.validated_data.get('last_name', ''),
            'password1': self.validated_data.get('password1', ''),
            'email': self.validated_data.get('email', ''),
            'country': self.validated_data.get('country', 'US'),
            'phone_number': self.validated_data.get('phone_no', '000000000000'),
            'position': self.validated_data.get('position', 'P'),
            'is_professional': self.validated_data.get('is_professional', True),
            'is_company': self.validated_data.get('is_company', False)
        }


    def custom_signup(self, request, user):
        try:
            user.userprofile
        except user._meta.model.userprofile.RelatedObjectDoesNotExist as e:
            UserProfile.objects.create(user=user)
            print('user profile created in serializer level')
        profile_data = {}
        profile_serializer = UserProfileSerializer(user.userprofile, data=self.get_cleaned_data(), partial=True)
        profile_serializer.is_valid(raise_exception=True)
        profile_serializer.save()
        if profile_serializer.data.get('position')!='B':
            proobj = Professional()
            proobj.user = user
            proobj.position = profile_serializer.data.get('position')
            proobj.save()
        # else:
        #     comobj = Company.objects.create(user=user)
