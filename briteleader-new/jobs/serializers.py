from rest_framework import serializers
from datetime import date
from django.conf import settings
from drf_yasg.utils import swagger_serializer_method
from .models import *
from bids.models import Bids
class JobsSerializer(serializers.ModelSerializer):
    id = serializers.ReadOnlyField()
    bids_count = serializers.SerializerMethodField()
    class Meta:
        model = Jobs
        fields = '__all__'

    def create(self, validated_data):
        instance = Jobs.objects.create(**validated_data)
        request = self.context.get('request')
        user = request.user
        instance.company = Company.objects.get(user_id=user.id)
        instance.save()
        return instance

    def get_bids_count(self, obj):
        return Bids.objects.filter(jobs=obj).count()