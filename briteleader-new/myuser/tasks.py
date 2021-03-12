from .utils import LocationFinder
from celery import shared_task
from django.core.mail import send_mail


@shared_task
def save_ip_location(user_activity_id):
    from .models import UserActivity
    user_activity = UserActivity.objects.get(pk=user_activity_id)

    location = LocationFinder()
    location.set_ip(user_activity.ip_address)
    if location.find():
        user_activity.location_longitude = location.lon
        user_activity.location_latitude = location.lat
        user_activity.city = location.city
        user_activity.save()
    else:
        user_activity.location_longitude = "-"
        user_activity.location_latitude = "-"
        user_activity.city = "-"
        user_activity.save()

@shared_task
def send_email_notification(user, subject, message, mailer):
    email = user.email
    send_mail(subject, message, mailer, email)

