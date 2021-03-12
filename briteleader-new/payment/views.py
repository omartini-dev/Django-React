from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import permissions
from rest_framework.decorators import action
from django.contrib.auth.models import User
import stripe
from djstripe.models import Plan, Customer
from myuser.models import UserProfile
from documentation.models import *
# Create your views here.

@api_view()
def setsubscribe(request):
	user = request.user
	customer, created = Customer.get_or_create(subscriber=user)
	token = request.query_params.get('token', None)
	customer.add_card(token)
	plan = Plan.objects.get(nickname="PROFESSIONAL")
	subscribe = customer.subscribe(plan)
	print(subscribe)
	proobj = UserProfile.objects.get(user=user)
	proobj.is_subscribed = True
	proobj.save()
	return Response('success')

@api_view()
def buydoc(request):
	user = request.user
	customer, created = Customer.get_or_create(subscriber=user)
	token = request.query_params.get('token', None)
	amount = request.query_params.get('price', None)
	doc = request.query_params.get('doc_id', None)
	customer.update_card(token)
	customer.charge(amount)
	purobj = PurchaseList()
	purobj.user_id = user.id
	purobj.doc_id = doc
	purobj.save()
	return Response('success')