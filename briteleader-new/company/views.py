from django.shortcuts import render
from rest_framework import viewsets, generics, mixins
from rest_framework.response import Response
from rest_framework import permissions
from rest_framework.decorators import action
from myuser.models import UserProfile
from .serializers import *
# Create your views here.
class CompanyViewSet(viewsets.ModelViewSet):
	"""
		create, update, delete
		GET, POST, PUT, PATCH, DELETE
	"""
	serializer_class = CompanySerializer
	queryset = Company.objects.all()
	permission_classes = (permissions.IsAuthenticatedOrReadOnly,)


class CompanyProfileViewSet(viewsets.ModelViewSet):
	"""
		create, update, delete, partial update
		GET, POST, PUT, PATCH, DELETE
	"""
	serializer_class = CompanyProfileSerializer
	queryset = CompanyProfile.objects.all()
	permission_classes = (permissions.IsAuthenticatedOrReadOnly,)

	@action(detail=False, methods=['get','post', 'patch'])
	def mydetail(self, request, pk=None):
		obj = UserProfile.objects.get(user=self.request.user)
		proobj = Company.objects.filter(user_id=obj.user_id)
		if len(proobj)==0:
			return Response('failed')
		else:
			proobj = Company.objects.get(user_id=obj.user_id)
			expobj = CompanyProfile.objects.filter(company_id=proobj.id)
			serializer = self.get_serializer(expobj,many=True)
			return Response(serializer.data)


class CompanyGeneralBenefitsViewSet(viewsets.ModelViewSet):
	"""
		create, update, delete, partial update
		GET, POST, PUT, PATCH, DELETE
	"""
	serializer_class = CompanyGeneralBenefitsSerializer
	queryset = CompanyGeneralBenefits.objects.all()
	permission_classes = (permissions.IsAuthenticatedOrReadOnly,)

	@action(detail=False, methods=['get','post', 'patch'])
	def mybenefits(self, request, pk=None):
		obj = UserProfile.objects.get(user=self.request.user)
		proobj = Company.objects.get(user_id=obj.id)
		expobj = CompanyGeneralBenefits.objects.get(id=proobj.id)
		serializer = self.get_serializer(expobj)
		return Response(serializer.data)

class RequiredDocsViewSet(viewsets.ModelViewSet):
	"""
		create, update, delete, partial update
		GET, POST, PUT, PATCH, DELETE
	"""
	serializer_class = RequiredDocsSerializer
	queryset = RequiredDocs.objects.all()
	permission_classes = (permissions.IsAuthenticatedOrReadOnly,)


class JobRequirementsViewSet(viewsets.ModelViewSet):
	"""
		create, update, delete, partial update
		GET, POST, PUT, PATCH, DELETE
	"""
	serializer_class = JobRequirementsSerializer
	queryset = JobRequirements.objects.all()
	permission_classes = (permissions.IsAuthenticatedOrReadOnly,)

class SelectionProcessViewSet(viewsets.ModelViewSet):
	"""
		create, update, delete, partial update
		GET, POST, PUT, PATCH, DELETE
	"""
	serializer_class = SelectionProcessSerializer
	queryset = SelectionProcess.objects.all()
	permission_classes = (permissions.IsAuthenticatedOrReadOnly,)
