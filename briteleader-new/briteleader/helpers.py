from django.core.mail import send_mail
from webpush import send_user_notification

#refer to the link below for settings on email. also settings for email in settings.py
#https://docs.djangoproject.com/en/2.0/topics/email/
def mailUser(user, subject, message, mailer):
    email = user.email
    send_mail(subject,message,mailer,email)


def notifyUser(user, title, message):
    payload = {"head": title, "body": message}
    send_user_notification(user=user, payload=payload, ttl=1000)

