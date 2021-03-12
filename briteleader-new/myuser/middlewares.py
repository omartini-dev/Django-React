from ipware import get_client_ip
from .models import UserActivity
from .tasks import save_ip_location

class ActivityMiddleware(object):

    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        response = self.get_response(request)
        if request.user.is_authenticated:
            user_activity = UserActivity()
            user_activity.user = request.user
            user_activity.path = request.path
            user_activity.method = request.method
            client_ip, is_routable = get_client_ip(request)
            user_activity.ip_address = client_ip
            user_activity.save()
            save_ip_location.delay(user_activity.id)
            #user_activity.body = request.body
            #user_activity.save()
        return response

class LocationMiddleware(object):

    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        response = self.get_response(request)
        if request.user.is_authenticated:
            user_activity = UserActivity()
            user_activity.user = request.user
            user_activity.path = request.path
            client_ip, is_routable = get_client_ip(request)
            user_activity.ip_address = client_ip
            user_activity.save()

        return response