from rest_framework import serializers
from datetime import date
from django.conf import settings
from drf_yasg.utils import swagger_serializer_method
from .models import *
from rest_framework.response import Response
class ChatSerializer(serializers.ModelSerializer):
    id = serializers.ReadOnlyField()
    senderprofile = serializers.SerializerMethodField()
    listenerprofile = serializers.SerializerMethodField()
    class Meta:
        model = Chat
        fields = '__all__'

    # def get_dcount(self, obj):
    #     return Chat.objects.filter(jobs=obj).count()
    def get_listenerprofile(self, obj):
      chatdata = obj.listener.userprofile.get_chat_data();
      return chatdata

    def get_senderprofile(self, obj):
      chatdata = obj.sender.userprofile.get_chat_data();
      return chatdata