from rest_framework import serializers
from .models import *
from myuser.serializers import UserProfileSerializer
from datetime import date
from django.utils.translation import gettext as _
from drf_yasg.utils import swagger_serializer_method


"""
Requirements: 
	Company 
		-> Created only if userprofile.is_company = True
		-> If we have partnership with company set Boolean to True
		-> If company has paid access to data set Boolean to True -> Authorize access to List of Professionals
	
	
	{ CompanyProfile , CompanyGeneralBenefits }         
		-> Created when Company is created -> User company has possibility to Update content of Model that he owns
		-> All users can vue informations specified (Public Infos )
	
	CompanyJobOffer :::: {RequiredDocs, JobRequirements, SelectionProcess, }
		-> Theses Models are linked together 
		-> User company can UPDATE, CREATE, DELETE , view LIST of own Content
		-> Each JobOffer has Own RequiredDocs, JobRequirements, SelectionProcess (1 item each)
		-> Many CompanyJobOffers Can be created by user.is_company
		-> All Users can Read LIST and content of CompanyJobOffer

"""
class BaseSerializer(serializers.ModelSerializer):
	def get_field_names(self, declared_fields, info):
		return super(BaseSerializer, self).get_field_names(declared_fields, info) + ['id',]

class CompanySerializer(serializers.ModelSerializer):
	id = serializers.ReadOnlyField()
	profile = serializers.SerializerMethodField()


	class Meta:
		model = Company
		fields = ['id', 'user', 'profile', 'establish', 'employees']

	def get_profile(self, obj):
		from myuser.serializers import UserProfileSerializer
		return UserProfileSerializer(obj.user.userprofile).data

	def create(self, validated_data):
		instance = Company.objects.create(**validated_data)
		request = self.context.get('request')
		companyprofile = CompanyProfile()
		companyprofile.company = instance

		if request.data.get('aircraft_type') is not None:
			companyprofile.aircraft_type = request.data['aircraft_type']
		if request.data.get('aircraft_number') is not None:
			companyprofile.aircraft_number = request.data['aircraft_number']
		if request.data.get('description') is not None:
			companyprofile.description = request.data['description']
		if request.data.get('type') is not None:
			companyprofile.type = request.data['type']
		if request.data.get('establish') is not None:
			companyprofile.establish = request.data['establish']
		if request.data.get('employees') is not None:
			companyprofile.employees = request.data['employees']
		if request.data.get('base') is not None:
			companyprofile.base = request.data['base']
		if request.data.get('destinations') is not None:
			companyprofile.destinations = request.data['destinations']
		if request.data.get('type_of_operation') is not None:
			companyprofile.type_of_operation = request.data['type_of_operation']

		companyprofile.save()

		benefits = CompanyGeneralBenefits()
		benefits.company = instance
		benefits.save()
		return instance

class CompanyProfileSerializer(serializers.ModelSerializer):
	id = serializers.ReadOnlyField()
	company = CompanySerializer(many=False, read_only=True)
	company_id = serializers.ReadOnlyField()
	class Meta:
		model = CompanyProfile
		fields = ['id', 'description', 'type',
						'type_of_operation', 'aircraft_type', 'aircraft_number', 'destinations',
						'base', 'company_id','company','aircraft_image']

	def create(self, validated_data):
		instance = CompanyProfile.objects.create(**validated_data)
		request = self.context.get('request')
		user = request.user
		instance.company = Company.objects.get(user_id=user.id)
		instance.save()
		return instance

	def get_company_object(self, obj):
		return CompanySerializer(obj.company).data

class CompanyGeneralBenefitsSerializer(serializers.ModelSerializer):
	id = serializers.ReadOnlyField()
	company = CompanySerializer(many=False, read_only=True)
	company_id = serializers.ReadOnlyField()
	class Meta:
		model = CompanyGeneralBenefits
		fields = '__all__'

	def get_company_object(self, obj):
		return CompanySerializer(obj.company).data

class RequiredDocsSerializer(serializers.ModelSerializer):
	class Meta:
		model = RequiredDocs
		fields = '__all__'

class JobRequirementsSerializer(serializers.ModelSerializer):
	class Meta:
		model = JobRequirements
		fields = '__all__'

class SelectionProcessSerializer(serializers.ModelSerializer):
	class Meta:
		model = SelectionProcess
		fields = '__all__'