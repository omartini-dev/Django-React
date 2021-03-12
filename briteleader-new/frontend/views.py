from django.shortcuts import render
from rest_framework.authtoken.models import Token
from django.conf import settings
def index(request):
	user = request.user
	returnVal = {'token':None}
	# try:
	# 	Token.objects.get(user=user)
	# except:
	if str(user)!='AnonymousUser':
		tokens, _ = Token.objects.get_or_create(user=user)
		returnVal = {'token':tokens.key}
		
	# token, _ = Token.objects.get(user=user)#_or_create
	return render(request, 'frontend/index.html', returnVal)
def detail(request,id):
	user = request.user

	returnVal = {'token':None}
	# try:
	# 	Token.objects.get(user=user)
	# except:
	if str(user)!='AnonymousUser':
		tokens, _ = Token.objects.get_or_create(user=user)
		returnVal = {'token':tokens.key}
		
	# token, _ = Token.objects.get(user=user)#_or_create
	return render(request, 'frontend/index.html', returnVal)

def login(request):
	return render(request, 'frontend/login.html', {'flag':0})

def signup(request):
	return render(request, 'frontend/login.html', {'flag':1})

def home(request):
	settings.GLOBAL_VAL=[4,5,65,6,7,7]
	return render(request, 'frontend/home.html', {'flag':2})