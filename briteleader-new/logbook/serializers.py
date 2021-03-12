from rest_framework import serializers
from .models import *
import datetime



"""
Description:

The logbook is used to store Pilots / Cabin crew flight experience.

the Flight Model contains Foreign Keys of all the other models.

The logbook is a display of list of all flight entries made by the professional.is_pilot / professional.is_cabincrew

The display will be a table with headers containing all the fields provided and linked to Flight Model

The User can (CREATE, UPDATE, DELETE ) each Flight. 


All the Duration fields are computed fields or relational fields ( exemple if is_imc -> total_time = ifr_flight_time

Please contact me for all trigger/ computed fields.

PreviousExperience Model is describing the previous professional experience.

TotalExperience Model is the sum of (PreviousExperience fields and Flight fields )
Only Duration fields are computed.


List of relationships : 

    FlightConditions { is_day_time => night_flight_time = 0
                        is_imc => total_time = ifr_flight_time
                        is_night_time => total_time = night_flight_time
                        }
                        
    CrewMembers { is_pic => self_name = User.first_name + last_name = pic_name, total_time = pic_time }
    
    Aircraft { is_single_engine_ac => total_time = single_engine_time }
                is_multi_engine_ac => total_time = multi_engine_time 
                is_jet_ac => is_multi_engine_ac = True, )                   
                         
    FlightHours { total_time = (on_block_time - off_block_time) UTC only }
    
Display and Layout.

    Single page With headers name are models Names
    list of fields organized this way.
    
    1- FlightData 
    2- Aircraft
    3- CrewMembers
    4- FlightConditions
    5-flightHours
    6-Simulator
    7-Events
    
"""
class TotalExperienceSerializer(serializers.ModelSerializer):
    id = serializers.ReadOnlyField()
    
    class Meta:
        model = TotalExperience
        fields = '__all__'

    def create(self, validated_data):
        instance = TotalExperience.objects.create(**validated_data)
        request = self.context.get('request')
        user = request.user
        pilotObj, created = Pilot.objects.get_or_create(user=user)
        pilotObj.total_experience = instance
        pilotObj.save()
        return instance

class PilotSerializer(serializers.ModelSerializer):
    id = serializers.ReadOnlyField()
    total_experience = TotalExperienceSerializer(many=False, read_only=True)
    class Meta:
        model = Pilot
        fields = '__all__'

    def get_total_experience_object(self, obj):
        return TotalExperienceSerializer(obj.total_experience).data

class FlightConditionsSerializer(serializers.ModelSerializer):
    id = serializers.ReadOnlyField()
    
    class Meta:
        model = FlightConditions
        fields = '__all__'

class CrewMembersSerializer(serializers.ModelSerializer):
    id = serializers.ReadOnlyField()
    
    class Meta:
        model = CrewMembers
        fields = '__all__'

class AircraftSerializer(serializers.ModelSerializer):
    id = serializers.ReadOnlyField()
    
    class Meta:
        model = Aircraft
        fields = '__all__'

class SimulatorSerializer(serializers.ModelSerializer):
    id = serializers.ReadOnlyField()
    
    class Meta:
        model = Simulator
        fields = '__all__'

class FlightDataSerializer(serializers.ModelSerializer):
    id = serializers.ReadOnlyField()
    
    class Meta:
        model = FlightData
        fields = '__all__'

class FlightHoursSerializer(serializers.ModelSerializer):
    id = serializers.ReadOnlyField()
    
    class Meta:
        model = FlightHours
        fields = '__all__'
        
class EventsSerializer(serializers.ModelSerializer):
    id = serializers.ReadOnlyField()
    
    class Meta:
        model = Events
        fields = '__all__'
        
class FlightSerializer(serializers.ModelSerializer):
    id = serializers.ReadOnlyField()
    flight_data = FlightDataSerializer(many=False, read_only=True)
    crew_members_data = CrewMembersSerializer(many=False, read_only=True)
    class Meta:
        model = Flight
        fields = '__all__'
    
    # def get_flight_data_object(self, obj):
    #     return FlightDataSerializer(obj.flight_data).data

    def create(self, validated_data):
        # instance = PreviousExperience.objects.create(**validated_data)
        request = self.context.get('request')
        user = request.user
        pilotObj, created = Pilot.objects.get_or_create(user=user)

        serializer = TotalExperienceSerializer(data=request.data)
        serializer.is_valid()
        if created or pilotObj.total_experience_id is None:
            total_exp = TotalExperience.objects.create(**serializer.validated_data)
            pilotObj.total_experience = total_exp
            pilotObj.save()

        fdserializer = FlightDataSerializer(data=request.data)
        fdserializer.is_valid()
        fdobj = FlightData.objects.create(**fdserializer.validated_data)

        crewserializer = CrewMembersSerializer(data=request.data)
        crewserializer.is_valid()
        crewobj = CrewMembers.objects.create(**crewserializer.validated_data)

        fherializer = FlightHoursSerializer(data=request.data)
        fherializer.is_valid()
        fhobj = FlightHours.objects.create(**fherializer.validated_data)

        fcerializer = FlightConditionsSerializer(data=request.data)
        fcerializer.is_valid()
        fcobj = FlightConditions.objects.create(**fcerializer.validated_data)

        airserializer = AircraftSerializer(data=request.data)
        airserializer.is_valid()
        airobj = Aircraft.objects.create(**airserializer.validated_data)

        eventserializer = EventsSerializer(data=request.data)
        eventserializer.is_valid()
        eventobj = Events.objects.create(**eventserializer.validated_data)

        smserializer = SimulatorSerializer(data=request.data)
        smserializer.is_valid()
        smobj = Simulator.objects.create(**smserializer.validated_data)

        instance = Flight()
        instance.pilot = pilotObj
        instance.flight_data = fdobj
        instance.crew_members_data = crewobj
        instance.flight_hours_data = fhobj
        instance.flight_conditions_data = fcobj
        instance.aircraft_data = airobj
        instance.events_data = eventobj
        instance.simulator_data = smobj
        instance.save()
        return instance