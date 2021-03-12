from rest_framework import routers
from django.conf.urls import url, include
from django.urls import path
from .views import *

app_name = 'logbook'
router = routers.DefaultRouter()


router.register(r'pilot_logbook', FlightViewSet)
router.register(r'pilot', PilotViewSet)
router.register(r'total', TotalExperienceViewSet)
router.register(r'flight', FlightDataViewSet)
router.register(r'fcond', FlightConditionsViewSet)
router.register(r'crew', CrewMembersViewSet)
router.register(r'aircraft', AircraftViewSet)
router.register(r'simulator', SimulatorViewSet)
router.register(r'fhours', FlightHoursViewSet)
router.register(r'event', EventsViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
