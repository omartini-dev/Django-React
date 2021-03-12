from allauth.account.adapter import DefaultAccountAdapter
from django.contrib.sites.shortcuts import get_current_site
from django.conf import settings
from briteleader.utils import send_mail_notification
# from .models import VerifyEmail

class DefaultAccountAdapter(DefaultAccountAdapter):

    def send_confirmation_mail(self, request, emailconfirmation, signup):
        current_site = get_current_site(request)
        frontend_link = settings.FRONTEND_CONFIRMATION_URL
        activate_url = self.get_email_confirmation_url(
            request,
            emailconfirmation)

        ctx = {
            "user": emailconfirmation.email_address.user,
            "activate_url": activate_url,
            "current_site": current_site,
            "key": emailconfirmation.key,
            "frontend_link": frontend_link,
            "email": emailconfirmation.email_address.email,
        }
        user = emailconfirmation.email_address.user
        if signup:
            send_mail_notification(user, 'Confirm email', 'account/email/email_confirmation.html', ctx)
            #email_template = 'account/email/email_confirmation.html'
        else:
            email_template = 'account/email/email_confirmation.html'
            self.send_mail(email_template,emailconfirmation.email_address.email,ctx)