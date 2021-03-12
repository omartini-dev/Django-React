from rest_framework import serializers
from .models import *

class DocumentationSerializer(serializers.ModelSerializer):
    id = serializers.ReadOnlyField()
    purchased = serializers.SerializerMethodField()

    class Meta:
        model = Documentation
        fields = '__all__'

    def get_purchased(self, obj):
        request = self.context.get('request')
        user = request.user
        purobj = PurchaseList.objects.filter(user=user,doc=obj)
        if(purobj):
            return True
        else:
            return False

class PurchaseListSerializer(serializers.ModelSerializer):
    id = serializers.ReadOnlyField()
    
    class Meta:
        model = PurchaseList
        fields = '__all__'

    def create(self, validated_data):
        instance = PurchaseList.objects.create(**validated_data)
        request = self.context.get('request')
        user = request.user
        instance.user = user
        instance.save()
        return instance