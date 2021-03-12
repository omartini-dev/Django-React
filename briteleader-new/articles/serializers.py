from rest_framework import serializers
from .models import *
from myuser.serializers import UserProfileSerializer
from datetime import date
from django.utils.translation import gettext as _
from drf_yasg.utils import swagger_serializer_method

class BaseSerializer(serializers.ModelSerializer):
	def get_field_names(self, declared_fields, info):
		return super(BaseSerializer, self).get_field_names(declared_fields, info) + ['id',]

class ArticlesSerializer(serializers.ModelSerializer):
	id = serializers.ReadOnlyField()
	profile = serializers.SerializerMethodField()
	comments = serializers.SerializerMethodField()
	class Meta:
		model = Articles
		fields = '__all__'

	def get_profile(self, obj):
		return obj.publisher.userprofile.get_chat_data()

	def get_comments(self, obj):
		comobj = Comments.objects.filter(article=obj)
		return CommentsSerializer(comobj, many=True).data

	def create(self, validated_data):
		request = self.context.get('request')
		user = request.user
		instance = Articles.objects.create(**validated_data)
		instance.publisher = user
		instance.save()
		return instance

class CommentsSerializer(serializers.ModelSerializer):
	id = serializers.ReadOnlyField()
	profile = serializers.SerializerMethodField()
	class Meta:
		model = Comments
		fields = '__all__'

	def get_profile(self, obj):
		if obj.commenter:
			return obj.commenter.userprofile.get_chat_data()
		else:
			return None

	def create(self, validated_data):
		request = self.context.get('request')
		user = request.user
		instance = Comments.objects.create(**validated_data)
		instance.commenter = user
		instance.save()
		return instance