from django.template.loader import render_to_string 
from django.utils.html import strip_tags 
from .tasks import send_email, send_push_notification
from twilio.rest import Client
from briteleader import settings
from fcm_django.models import FCMDevice


def send_mail_notification(user, subject, template, context):
    webapp_icon = "https://soleo-coming-static.s3.amazonaws.com/media/static/photos/minilogo.png"
    site = "soleotogether.com"
    context ["site"] = site
    context["icon"] = webapp_icon
    subject = subject
    from_email= settings.EMAIL_FROM
    to = user.email
    html_content = render_to_string(template, context) # render with dynamic value 
    text_content = strip_tags(html_content) # Strip the html tag. So people can see the pure text at least. 

    devices = FCMDevice.objects.filter(user=user)
    for device in devices:
            send_push_notification.delay(device.id, subject)

    send_email.delay(subject, text_content, from_email, to, html_content)


def send_sms_notification(phone_number, message):
    client = Client(settings.TWILIO_ACCOUNT_SID, settings.TWILIO_AUTH_TOKEN)
    client.messages.create(
        to=phone_number,
        from_=settings.TWILIO_PHONE_NUMBER,
        body=message)


def send_mail_support(user, subject, template, context):
    subject = subject
    from_email = settings.SUPPORT_EMAIL
    to = user.email
    html_content = render_to_string(template, context)
    text_content = strip_tags(html_content)

    send_email.delay(subject, text_content, from_email, to, html_content)


def send_mail_marketing(user, subject, template, context):
    subject = subject
    from_email = settings.MARKETING_EMAIL
    to = user.email
    html_content = render_to_string(template, context)
    text_content = strip_tags(html_content)

    send_email.delay(subject, text_content, from_email, to, html_content)

def send_mail_to_admin(subject, template, context):
    webapp_icon = "https://soleo-coming-static.s3.amazonaws.com/media/static/photos/minilogo.png"
    site = "soleotogether.com"
    context ["site"] = site
    context["icon"] = webapp_icon
    subject = subject
    from_email = settings.EMAIL_FROM
    to = settings.SUPPORT_EMAIL_ADDRESS
    html_content = render_to_string(template, context) # render with dynamic value 
    text_content = strip_tags(html_content) # Strip the html tag. So people can see the pure text at least. 
    
    send_email.delay(subject, text_content, from_email, to, html_content)