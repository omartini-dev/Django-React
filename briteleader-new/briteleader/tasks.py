from django.core.mail import EmailMultiAlternatives 
from celery import shared_task
from fcm_django.models import FCMDevice

@shared_task
def send_email(subject, text_content, from_email, to, html_content):
    # create the email, and attach the HTML version as well. 
    msg = EmailMultiAlternatives(subject, text_content, from_email, [to]) 
    msg.attach_alternative(html_content, "text/html") 
    msg.send()

@shared_task
def send_push_notification(device_id, subject):
    print("device", device_id)
    device = FCMDevice.objects.get(pk=device_id)
    device.send_message(subject, "")
    return device_id
