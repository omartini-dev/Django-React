from django.shortcuts import render
from rest_framework import viewsets, generics, mixins
from django.views import generic
from rest_framework.response import Response
from rest_framework import permissions
from rest_framework.decorators import action
from rest_framework import filters
from django_filters.rest_framework import DjangoFilterBackend
from .serializers import *
from django.db.models import Q
# Create your views here.
class JobsViewSet(viewsets.ModelViewSet):
    """
        create, update, delete
        GET, POST, PUT, PATCH, DELETE
    """
    queryset = Jobs.objects.all()
    serializer_class = JobsSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['title', 'country', 'description', 'exp_lv', 'rate', 'job_type','company_id']
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)
    # def get_queryset(self):
    #     queryset = Professional.objects.all()
    #     position = self.request.query_params.get('position', None)
    #     title = self.request.query_params.get('title', None)
    #     country = self.request.query_params.get('country', None)
    #     exp_lv = self.request.query_params.get('exp_lv', None)
    #     job_type = self.request.query_params.get('job_type', None)
    #     rate = self.request.query_params.get('rate', None)
    #     if position is not None:
    #         queryset = queryset.filter(position=position)
    #     if title is not None:
    #         queryset = queryset.filter(title=title)
    #     if country is not None:
    #         queryset = queryset.filter(country=country)
    #     if exp_lv is not None:
    #         queryset = queryset.filter(exp_lv=exp_lv)
    #     if job_type is not None:
    #         queryset = queryset.filter(job_type=job_type)
    #     if rate is not None:
    #         queryset = queryset.filter(rate=rate)

    #     return queryset
