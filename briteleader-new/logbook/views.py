from django.shortcuts import render
from .models import Flight
# from .serializers import FlightSerializer
from rest_framework import permissions
from rest_framework import viewsets, generics, mixins
from rest_framework.views import APIView
from rest_framework.decorators import api_view
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework import filters
from .models import *
from .serializers import *
# Create your views here.





class FlightViewSet(viewsets.ModelViewSet):
    """
        create, update, delete
        GET, POST, PUT, PATCH, DELETE
    """
    serializer_class = FlightSerializer
    queryset = Flight.objects.all()
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)

    def get_queryset(self):
        queryset = Flight.objects.all()
        user = self.request.user
        target = self.request.query_params.get('target', None)
        if target is not None:
            pilotobj = Pilot.objects.get(user_id=target)
        else:
            pilotobj, created = Pilot.objects.get_or_create(user=user)
        queryset = queryset.filter(pilot=pilotobj)
        
        return queryset

class PilotViewSet(viewsets.ModelViewSet):
    """
        create, update, delete
        GET, POST, PUT, PATCH, DELETE
    """
    serializer_class = PilotSerializer
    queryset = Pilot.objects.all()
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)

    @action(detail=False, methods=['get','post', 'patch'])
    def myinfo(self, request, pk=None):
        user = request.user
        pilotobj, created = Pilot.objects.get_or_create(user=user)

        serializer = self.get_serializer(pilotobj)
        return Response(serializer.data)

    def get_queryset(self):
        queryset = Pilot.objects.all()
        user = self.request.user
        target = self.request.query_params.get('target', None)
        if target is not None:
            queryset = queryset.filter(user_id=target)
        
        return queryset

class TotalExperienceViewSet(viewsets.ModelViewSet):
    """
        create, update, delete
        GET, POST, PUT, PATCH, DELETE
    """
    serializer_class = TotalExperienceSerializer
    queryset = TotalExperience.objects.all()
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)

class FlightDataViewSet(viewsets.ModelViewSet):
    """
        create, update, delete
        GET, POST, PUT, PATCH, DELETE
    """
    serializer_class = FlightDataSerializer
    queryset = FlightData.objects.all()
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)

class EventsViewSet(viewsets.ModelViewSet):
    """
        create, update, delete
        GET, POST, PUT, PATCH, DELETE
    """
    serializer_class = EventsSerializer
    queryset = Events.objects.all()
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)

class FlightHoursViewSet(viewsets.ModelViewSet):
    """
        create, update, delete
        GET, POST, PUT, PATCH, DELETE
    """
    serializer_class = FlightHoursSerializer
    queryset = FlightHours.objects.all()
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)

class SimulatorViewSet(viewsets.ModelViewSet):
    """
        create, update, delete
        GET, POST, PUT, PATCH, DELETE
    """
    serializer_class = SimulatorSerializer
    queryset = Simulator.objects.all()
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)

class AircraftViewSet(viewsets.ModelViewSet):
    """
        create, update, delete
        GET, POST, PUT, PATCH, DELETE
    """
    serializer_class = AircraftSerializer
    queryset = Aircraft.objects.all()
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)
    
class CrewMembersViewSet(viewsets.ModelViewSet):
    """
        create, update, delete
        GET, POST, PUT, PATCH, DELETE
    """
    serializer_class = CrewMembersSerializer
    queryset = CrewMembers.objects.all()
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)
    
class FlightConditionsViewSet(viewsets.ModelViewSet):
    """
        create, update, delete
        GET, POST, PUT, PATCH, DELETE
    """
    serializer_class = FlightConditionsSerializer
    queryset = FlightConditions.objects.all()
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)
    