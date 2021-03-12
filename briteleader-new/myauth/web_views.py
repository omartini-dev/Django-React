from django.shortcuts import render
from allauth.account.forms import LoginForm, SignupForm

def vote(request, question_id):
    context = {
        'login_form': LoginForm(),
        'signup_form': SignupForm(),
        'form': LoginForm(),
    }
    return render(request, 'myauth/login.html', context)