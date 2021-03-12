from django.shortcuts import render
from rest_framework import viewsets, generics, mixins
from django.views import generic
from rest_framework.response import Response
from rest_framework import permissions
from rest_framework.decorators import action
from rest_framework import filters
from .serializers import *
from django.db.models import Q
# from wkhtmltopdf.views import PDFTemplateView

from django.http import HttpResponse
from xhtml2pdf import pisa
# Create your views here.




class ProfessionalViewSet(viewsets.ModelViewSet):
    """
        create, update, delete
        GET, POST, PUT, PATCH, DELETE
    """
    queryset = Professional.objects.all()
    serializer_class = ProfessionalSerializer
    filter_backends = (filters.SearchFilter,)
    search_fields = ['skills']
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)
    def get_queryset(self):
        queryset = Professional.objects.all()
        position = self.request.query_params.get('position', None)
        passport = self.request.query_params.get('passport', None)
        license = self.request.query_params.get('license', None)
        medical = self.request.query_params.get('medical', None)
        logbook = self.request.query_params.get('logbook', None)
        if position is not None:
            queryset = queryset.filter(position=position)

        if passport is not None:
            queryset = queryset.filter(~Q(professionaldocs__passport = None))
        if license is not None:
            queryset = queryset.filter(~Q(professionaldocs__license = None))
        if medical is not None:
            queryset = queryset.filter(~Q(professionaldocs__medical = None))
        if logbook is not None:
            queryset = queryset.filter(~Q(professionaldocs__logbook = None))

        return queryset

    @action(detail=False, methods=['get','post', 'patch'])
    def prodetail(self, request, pk=None):
        obj = UserProfile.objects.get(user=self.request.user)
        proobj = Professional.objects.get(user_id=obj.user_id)

        expobj = ExperienceProfile.objects.filter(pro_id=proobj.id)
        eduobj = EducationProfile.objects.filter(pro_id=proobj.id)

        proserializer = self.get_serializer(proobj)
        expserializer = ExperienceProfileSerializer(expobj, many=True)
        eduserializer = EducationProfileSerializer(eduobj, many=True)
        return Response({'profile':proserializer.data, 'exp':expserializer.data, 'edu':eduserializer.data})

    @action(detail=True, methods=['get','post', 'patch'])
    def proinfo(self, request, pk):
        proobj = Professional.objects.get(id=pk)

        expobj = ExperienceProfile.objects.filter(pro_id=proobj.id)
        eduobj = EducationProfile.objects.filter(pro_id=proobj.id)

        proserializer = self.get_serializer(proobj)
        expserializer = ExperienceProfileSerializer(expobj, many=True)
        eduserializer = EducationProfileSerializer(eduobj, many=True)
        return Response({'profile':proserializer.data, 'exp':expserializer.data, 'edu':eduserializer.data})



class ExperienceProfileViewSet(viewsets.ModelViewSet):
    """
        create, update, delete, partial update
        GET, POST, PUT, PATCH, DELETE
    """
    serializer_class = ExperienceProfileSerializer
    queryset = ExperienceProfile.objects.all()
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)

    @action(detail=False, methods=['get','post', 'patch'])
    def mydetail(self, request, pk=None):
        obj = UserProfile.objects.get(user=self.request.user)
        proobj = Professional.objects.get(user_id=obj.id)
        expobj = ExperienceProfile.objects.get(pro_id=proobj.id)
        serializer = self.get_serializer(expobj,many=True)
        return Response(serializer.data)

class EducationProfileViewSet(viewsets.ModelViewSet):
    """
        create, update, delete, partial update
        GET, POST, PUT, PATCH, DELETE
    """
    serializer_class = EducationProfileSerializer
    queryset = EducationProfile.objects.all()
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)


class CompetenceProfileViewSet(viewsets.ModelViewSet):
    """
        create, update, delete, partial update
        GET, POST, PUT, PATCH, DELETE
    """
    serializer_class = CompetenceProfileSerializer
    queryset = CompetenceProfile.objects.all()
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)

class ProfessionalDocsViewSet(viewsets.ModelViewSet):
    """
        create, update, delete, partial update
        GET, POST, PUT, PATCH, DELETE
    """
    serializer_class = ProfessionalDocsSerializer
    queryset = ProfessionalDocs.objects.all()
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)


# class MakeProfilePDFView(PDFTemplateView):
#     template_name='profile_template.html'
#     filename='profile.pdf'

#     def get_context_data(self, **kwargs):
#         proobj = Professional.objects.get(id=kwargs['pk'])
#         expobj = ExperienceProfile.objects.filter(pro_id=proobj.id)
#         eduobj = EducationProfile.objects.filter(pro_id=proobj.id)
#         competenceobj = CompetenceProfile.objects.filter(pro_id=proobj.id)
#         userobj = UserProfile.objects.get(user=proobj.user)
#         print(userobj.phone_number)
#         print('----------------------------------------')
#         return super(MakeProfilePDFView, self).get_context_data(
#             pagesize='A4',
#             title='Hi there!',
#             pro=proobj,
#             exp=expobj,
#             edu=eduobj,
#             user=userobj,
#             competence=competenceobj,
#             **kwargs
#         )