from rest_framework import serializers
from .models import UserProfile, User, ContactUs, Languages, Newsletter
from datetime import date
from django.conf import settings
from drf_yasg.utils import swagger_serializer_method
from django.core.files import File
from utils.serializers import ModelQuerySerializer
from . import models
from .image_utils import strip_metadata
from django.utils.translation import ugettext as _
from professional.serializers import ProfessionalSerializer
from professional.models import *


class LanguagesSerializer(serializers.ModelSerializer):
    title = serializers.SerializerMethodField()

    class Meta:
        model = Languages
        fields = '__all__'

    def get_title(self, obj):
        return _(obj.title)

class NewsletterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Newsletter
        fields = '__all__'


class LanguagesQuerySerializer(ModelQuerySerializer):
    class Meta:
        model = Languages
        fields = ('title',)


class UserDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('first_name', 'last_name', 'email')



class UserObjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('first_name', 'last_name', 'email')


class UserPublicProfileSerializer(serializers.ModelSerializer):
    user = serializers.PrimaryKeyRelatedField(read_only=True)
    user_object = serializers.SerializerMethodField(required=False)
    age = serializers.SerializerMethodField(required=False)
    avatar = serializers.ImageField(write_only=True)
    avatar_link = serializers.SerializerMethodField(read_only=False)
    id = serializers.SerializerMethodField()

    class Meta:
        model = UserProfile
        fields = '__all__'

    def get_age(self, obj):
        today = date.today()
        try:
            return today.year - obj.birth_date.year - (
            (today.month, today.day) < (obj.birth_date.month, obj.birth_date.day))
        except:
            return None

    @swagger_serializer_method(serializer_or_field=serializers.CharField())
    def get_avatar_link(self, obj):

        try:
            return obj.avatar.url
        except Exception as e:
            return ""

    def get_id(self, obj):
        return obj.user.id

    def get_user_object(self, obj):
        return UserObjectSerializer(obj.user).data


class UserProfileSerializer(serializers.ModelSerializer):

    user = serializers.PrimaryKeyRelatedField(read_only=True)
    user_object = serializers.SerializerMethodField()
    age = serializers.SerializerMethodField()
    avatar = serializers.ImageField(write_only=True)
    avatar_link = serializers.SerializerMethodField(read_only=False)
    id = serializers.SerializerMethodField()
    send_sms_user = serializers.BooleanField()

    def __init__(self, *args, **kwargs):
        super(UserProfileSerializer, self).__init__(*args, **kwargs)

    class Meta:
        model = UserProfile
        fields = (
            'id', 'address_1',
            'address_2', 'avatar', 'avatar_link',
            'birth_date', 'company_name',
            'age',
            'user', 'city', 'state',
            'country', 'zip_code',
            'user_object', 'phone_number',
            'type', 'send_sms_user', 'position', 'is_professional', 'is_company','following','follower','desc',
            'cover','social_link1','social_link2','overview', 'is_subscribed',
        )

    @swagger_serializer_method(serializer_or_field=serializers.FloatField())
    def get_age(self, obj):
        today = date.today()
        try:
            return today.year - obj.birth_date.year - (
            (today.month, today.day) < (obj.birth_date.month, obj.birth_date.day))
        except:
            return None


    @swagger_serializer_method(serializer_or_field=serializers.BooleanField())
    def get_send_sms_user(self, obj):
        return obj.send_sms_user


    def get_user_object(self, obj):
        return UserObjectSerializer(obj.user).data

    def get_firstname(self, obj):
        return obj.user.first_name

    def get_lastname(self, obj):
        return obj.user.last_name

    def get_id(self, obj):
        return obj.user.id


    @swagger_serializer_method(serializer_or_field=serializers.URLField())
    def get_avatar_link(self, obj):
        try:
            return obj.avatar.url
        except Exception as e:
            return ""


class UserSerializer(serializers.ModelSerializer):
    profile = serializers.SerializerMethodField()
    pro = serializers.SerializerMethodField()
    #company = serializers.SerializerMethodField()
    class Meta:
        model = User
        fields = ('id', 'profile', 'pro',)

    def get_profile(self, obj):
        return UserProfileSerializer(obj.userprofile).data

    def get_pro(self, obj):
        return ProfessionalSerializer(obj.professional).data

    #def get_company(self, obj):
    #    return CompanySerializer(obj.company).data


class ContactUsSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactUs
        fields = '__all__'


class ImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile

    image = serializers.ImageField()

    def save(self, **kwargs):
        f_orig = self.validated_data['image']
        fn = f_orig.name
        sanitized_image = strip_metadata(f_orig)
        f_new = File(sanitized_image)
        f_new.name = fn
        self.validated_data['image'] = f_new
        return super().save(**kwargs)