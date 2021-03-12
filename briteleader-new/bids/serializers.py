from rest_framework import serializers
from datetime import date
from django.conf import settings
from drf_yasg.utils import swagger_serializer_method
from .models import *

class BidsSerializer(serializers.ModelSerializer):
    id = serializers.ReadOnlyField()

    class Meta:
        model = Bids
        fields = '__all__'

    def create(self, validated_data):
        jobs = validated_data['jobs']
        request = self.context.get('request')
        user = request.user
        pro = Professional.objects.get(user_id=user.id)
        exist = Bids.objects.filter(jobs=jobs, professional=pro)
        if len(exist) > 0:
        	return exist[0]
        instance = Bids.objects.create(**validated_data)
        instance.professional = pro
        instance.save()
        return instance