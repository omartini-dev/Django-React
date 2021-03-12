from rest_framework import serializers
from datetime import date
from django.conf import settings
from drf_yasg.utils import swagger_serializer_method
from .models import *


"""
Professional Model is created only if userprofile.is_professional = True
Which is determined by the userprofile.position != 'B'
Professional.is_subscribed informs if user has access to restricted content.

ExperienceProfile, EducationProfile, CompetenceProfile , ProfessionalDocs
-> Can be Many linked to the professional Profile.
iso Linkedin -> Users professionals can CREATE, UPDATE, DELETE, LIST
 content of these 3 models.(Many True)

CREATE LIST of PROFESSIONALS to be displayed in the frontend
Search terms are = user{ Last name } , experience {job_title},
 Userprofile{ country, city }

once all fields are entered -> Create a Professional CV (PDF file)
 design to be provided.

Users Professionals can view list of Job offers given by companies.
On selection Pro can view details of the company + submit application (
--> Email to Company with params (Formatted CV + content of ProfessionalDocs )

"""

class BaseSerializer(serializers.ModelSerializer):
    def get_field_names(self, declared_fields, info):
        return super(BaseSerializer, self).get_field_names(declared_fields, info) + ['id',]


class ProfessionalSerializer(serializers.ModelSerializer):
    id = serializers.ReadOnlyField()
    profile = serializers.SerializerMethodField()

    class Meta:
        model = Professional
        fields = ['id', 'user', 'overview', 'skills', 'profile', 'position']

    def get_profile(self, obj):
        from myuser.serializers import UserProfileSerializer
        return UserProfileSerializer(obj.user.userprofile).data

    def create(self, validated_data):
        instance = Professional.objects.create(**validated_data)
        competence = CompetenceProfile()
        competence.pro = instance
        competence.save()
        experience = ExperienceProfile()
        experience.pro = instance
        experience.save()
        education = EducationProfile()
        education.pro = instance
        education.save()
        return instance


    # def update(self, instance, validated_data):
    #     instance.title = validated_data.get('title', instance.title)
    #     instance.code = validated_data.get('code', instance.code)
    #     instance.linenos = validated_data.get('linenos', instance.linenos)
    #     instance.language = validated_data.get('language', instance.language)
    #     instance.style = validated_data.get('style', instance.style)
    #     instance.save()
    #     return instance

class ExperienceProfileSerializer(serializers.ModelSerializer):
    id = serializers.ReadOnlyField()
    # pro = ProfessionalSerializer(many=False, read_only=True)
    pro_id = serializers.ReadOnlyField()
    start_date = serializers.DateField(allow_null=True)
    end_date = serializers.DateField(allow_null=True)

    class Meta:
        model = ExperienceProfile
        fields = [
            'id', 'job_title', 'company_name',
            'city', 'country', 'start_date', 'end_date',
            'is_current_job', 'pro_id','content',
            # 'pro'
        ]

    def create(self, validated_data):
        instance = ExperienceProfile.objects.create(**validated_data)
        request = self.context.get('request')
        user = request.user
        instance.pro = Professional.objects.get(user_id=user.id)
        instance.save()
        return instance
    # def get_pro_object(self, obj):
    #     return ProfessionalSerializer(obj.pro).data


class EducationProfileSerializer(serializers.ModelSerializer):
    start_date = serializers.DateField(allow_null=True)
    end_date = serializers.DateField(allow_null=True)
    id = serializers.ReadOnlyField()
    # pro = ProfessionalSerializer(many=False, read_only=True)
    pro_id = serializers.ReadOnlyField()

    class Meta:
        model= EducationProfile
        fields = [
            'id', 'diploma', 'school', 'city',
            'country', 'start_date', 'end_date', 'pro_id','content',
            # ,'pro'
        ]

    def create(self, validated_data):
        instance = EducationProfile.objects.create(**validated_data)
        request = self.context.get('request')
        user = request.user
        instance.pro = Professional.objects.get(user_id=user.id)
        instance.save()
        return instance
    # def get_pro_object(self, obj):
    #     return ProfessionalSerializer(obj.pro).data



class CompetenceProfileSerializer(serializers.HyperlinkedModelSerializer):
    id = serializers.ReadOnlyField()
    pro_id = serializers.ReadOnlyField()
    # pro = ProfessionalSerializer(read_only=True)

    class Meta:
        model = CompetenceProfile
        fields = [
             'id', 'subject', 'level','pro_id',
             # 'pro',
        ]
    # def get_pro_object(self, obj):
    #     return ProfessionalSerializer(obj.pro).data


class ProfessionalDocsSerializer(serializers.HyperlinkedModelSerializer):
    id = serializers.ReadOnlyField()
    # pro = ProfessionalSerializer(read_only=True)

    class Meta:
        model = ProfessionalDocs
        fields = [
             'id', 'passport', 'license', 'medical', 'logbook', 'recommendation_letter', 'employer_letter','pro_id',
             # 'pro',
        ]
   


