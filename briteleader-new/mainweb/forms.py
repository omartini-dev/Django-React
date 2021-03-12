from allauth.account.forms import SignupForm
from django import forms
from allauth.account.adapter import get_adapter
from allauth.account.utils import setup_user_email


class MyCustomSignupForm(SignupForm):
    first_name = forms.CharField(widget=forms.TextInput(attrs={'placeholder': 'firstname'}))
    last_name = forms.CharField(widget=forms.TextInput(attrs={'placeholder': 'lastname'}))
    def __init__(self, *args, **kwargs):
        super(MyCustomSignupForm, self).__init__(*args, **kwargs)
        #self.fields['a'] = PasswordField(label="Passwordss")

    def clean(self):
        cleaned_data = super(SignupForm, self).clean()
        print(cleaned_data)
        return cleaned_data

    def save(self, request):
        adapter = get_adapter()
        user = adapter.new_user(request)
        self.cleaned_data = self.clean()
        adapter.save_user(request, user, self)
        self.custom_signup(request, user)
        setup_user_email(request, user, [])
        return user