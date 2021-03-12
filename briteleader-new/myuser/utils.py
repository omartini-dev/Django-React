import requests
from ipware import get_client_ip

class LocationFinder(object):
    def set_ip(self, ip_address):
        self.ip_address = ip_address

    def calculate_ip(self, requests):
        client_ip, is_routable = get_client_ip(requests)
        self.ip_address = client_ip

    def find(self):
        req = requests.get("http://ip-api.com/json/{0}".format(self.ip_address))
        req = req.json()
        try:
            self.city = req["city"]
            self.lat = req["lat"]
            self.lon = req["lon"]
            return True
        except:
            self.city = ""
            self.lat = ""
            self.lon = ""
            return False

class LocationFinderFromGeo(object):
    def __init__(self, requests):
        self.requests = requests

    def find(self):
        location = self.requests.META.get('HTTP_LOCATION', None)
        if location:
            data = location.split(":")
            self.lat = data[0]
            self.lon = data[0]
            self.city = "Ede"
            return True
        else:
            return False
