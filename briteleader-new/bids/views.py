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
class BidsViewSet(viewsets.ModelViewSet):
    """
        create, update, delete
        GET, POST, PUT, PATCH, DELETE
    """
    queryset = Bids.objects.all()
    serializer_class = BidsSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['title', 'description', 'jobs', 'professional']
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)