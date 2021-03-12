from django.shortcuts import render
from django.utils.translation import gettext as _
from rest_framework import viewsets, generics, mixins
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework import permissions
from .serializers import UserProfile, UserProfileSerializer, ContactUsSerializer, ContactUs,\
    UserDataSerializer, LanguagesQuerySerializer, LanguagesSerializer, Languages, \
    Newsletter, NewsletterSerializer
from utils.views import ViewQueryMixin
from django.shortcuts import get_object_or_404
# Create your views here.


class ProfileViewSet(viewsets.GenericViewSet, mixins.UpdateModelMixin, mixins.RetrieveModelMixin):
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileSerializer
    model_class = UserProfile
    permission_classes = [permissions.IsAuthenticated,]

    def get_object(self):
        #obj = get_object_or_404(UserProfile.objects.all(), **{"user": self.kwargs["pk"]})
        obj = UserProfile.objects.get(user=self.request.user)
        self.check_object_permissions(self.request, obj)
        return obj


    @action(detail=False, methods=['GET'])
    def user(self, request, *args, **kwargs):
        user = self.request.user
        return Response(UserDataSerializer(user).data)


    def check_object_permissions(self, request, obj):
        super(ProfileViewSet, self).check_object_permissions(request, obj)
        if obj.user != request.user:
            self.permission_denied(request)


class ContactUsView(viewsets.GenericViewSet, mixins.CreateModelMixin):
    queryset = ContactUs.objects.all()
    serializer_class = ContactUsSerializer
    model_class =ContactUs

class LanguagesViewSet(mixins.ListModelMixin, mixins.RetrieveModelMixin, ViewQueryMixin, viewsets.GenericViewSet):
    """
    list:
    List Languages filtered by query parameters

    retrieve:
    Retrieve languages by id
    """
    queryset = Languages.objects.all()
    serializer_class = LanguagesSerializer
    query_serializer = LanguagesQuerySerializer

    def get_queryset(self):
        language = self.request.query_params.get('language', None)
        if language:
            self.queryset = self.queryset.filter(language_id=language)
        return self.queryset.all()

class NewsletterViewSet(viewsets.GenericViewSet, mixins.CreateModelMixin, mixins.UpdateModelMixin, mixins.RetrieveModelMixin):
    queryset = Newsletter.objects.all()
    serializer_class = NewsletterSerializer
    model_class = Newsletter

