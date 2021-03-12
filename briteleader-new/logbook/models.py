from django.db import models
from django.utils import timezone
from django.contrib.auth.models import User
import datetime
# Create your models here.


"""
The logbook is available to Pilots and Cabin crew only

TotalExperience , PreviousExperience, Flight are created by default whenever the User is Pilot or Cabin Crew

They are displayed in the frontend as a table , that can be printed following 2 or 3 formats 

The formats are EASA standard , FAA , ICAO ( they all have common fields , it's just the table layout that changes )

Need to add the possibility to export ALL the Flights as .CSV format

Need to add possibility to export as PDF the last 3 pages ( each page has 15 rows of Flights ) and at the bottom we have 
the previous experience and below it the total experience [ check below # comments for clarifications ]
"""







# Total experience describes the computed totals of (Previous experience and Flight ) -> Sum of Durations for specific Fields with the same name
# the fields are named identically to avoid confusion.

class TotalExperience(models.Model):
    single_engine_hours_actual = models.DurationField(default=datetime.timedelta(days=0), blank=True)
    multi_engine_hours_actual = models.DurationField(default=datetime.timedelta(days=0), blank=True)
    multi_pilot_hours_actual = models.DurationField(default=datetime.timedelta(days=0), blank=True)
    total_flight_hours_actual = models.DurationField(default=datetime.timedelta(days=0), blank=True)
    total_night_hours_actual = models.DurationField(default=datetime.timedelta(days=0), blank=True)
    total_ifr_hours_actual = models.DurationField(default=datetime.timedelta(days=0), blank=True)
    total_pic_hours_actual = models.DurationField(default=datetime.timedelta(days=0), blank=True)
    total_copilot_hours_actual = models.DurationField(default=datetime.timedelta(days=0), blank=True)
    total_dual_hours_actual = models.DurationField(default=datetime.timedelta(days=0), blank=True)
    total_instructor_hours_actual = models.DurationField(default=datetime.timedelta(days=0), blank=True)
    total_simulator_hours_actual = models.DurationField(default=datetime.timedelta(days=0), blank=True)


# Previous experience is the Carry forward Values that are the base of the Total experience calculation
# this field is Integrated to the Professional ( Pilot / Cabin crew ) Profiles
# they can Update it.
class PreviousExperience(models.Model):
    single_engine_hours_previous = models.DurationField(default=datetime.timedelta(days=0), blank=True)
    multi_engine_hours_previous = models.DurationField(default=datetime.timedelta(days=0), blank=True)
    multi_pilot_hours_previous = models.DurationField(default=datetime.timedelta(days=0), blank=True)
    total_flight_hours_previous = models.DurationField(default=datetime.timedelta(days=0), blank=True)
    total_night_hours_previous = models.DurationField(default=datetime.timedelta(days=0), blank=True)
    total_ifr_hours_previous = models.DurationField(default=datetime.timedelta(days=0), blank=True)
    total_pic_hours_previous = models.DurationField(default=datetime.timedelta(days=0), blank=True)
    total_copilot_hours_previous = models.DurationField(default=datetime.timedelta(days=0), blank=True)
    total_dual_hours_previous = models.DurationField(default=datetime.timedelta(days=0), blank=True)
    total_instructor_hours_previous = models.DurationField(default=datetime.timedelta(days=0), blank=True)
    total_simulator_hours_previous = models.DurationField(default=datetime.timedelta(days=0), blank=True)



# The pilot model describes the pilot experience Summuary
class Pilot(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, null=True)
    total_experience = models.ForeignKey(TotalExperience, on_delete=models.CASCADE, null=True)



# Conditions of the Flight operated , each object triggers data transfer that can be edited before saving
# exemple if is_night_flight is True, the total_flight_time object = night_flight_time
# if is_imc -> total_fight_time = Ifr_flight_time
# if is_day_time -> night_flight_time defaults to 0
class FlightConditions(models.Model):
    is_day_time = models.BooleanField(default=True)
    is_night_time = models.BooleanField(default=False)
    is_imc = models.BooleanField(default=False)
    is_ifr = models.BooleanField(default=False)
    is_pic = models.BooleanField(default=False)
    is_copilot = models.BooleanField(default=False)
    is_dual = models.BooleanField(default=False)
    is_instructor = models.BooleanField(default=False)


# names of crew members , Ideally we store the name of the crewmembers for quick fetching,
# if the crew member is also a User , Possibility to return First name and last name.
# user can query flights objects by pilots names or by is_pic ordered by date.
class CrewMembers(models.Model):
    self_name = models.CharField(max_length=100, blank=True, help_text='This the User first_name + last_name object')
    pic_name = models.CharField(max_length=100, blank=True)
    first_officer_name = models.CharField(max_length=100, blank=True)
    other_crew_2 = models.CharField(max_length=100, blank=True)
    other_crew_3 = models.CharField(max_length=100, blank=True)
    other_crew_4 = models.CharField(max_length=100, blank=True)



# describes the Aircraft flown and caracteristics
# ideally this needs to be made public for all users to avoid duplicates.
class Aircraft(models.Model):
    aircraft_type = models.CharField(max_length=100, blank=True)
    aircraft_registration = models.CharField(max_length=100, blank=True)
    is_single_engine_ac = models.BooleanField(default=False)
    is_multi_engine_ac = models.BooleanField(default=False)
    is_multi_pilot = models.BooleanField(default=False)
    is_single_pilot = models.BooleanField(default=False)
    is_jet_ac = models.BooleanField(default=False)
    is_sim = models.BooleanField(default=False)

# Iso Aircraft , it describes the simulator used.
# simulator instructor needs to be accessible to self user only
class Simulator(models.Model):
    simulator_date = models.DateField(blank=True, null=True)
    simulator_type = models.CharField(max_length=100, null=True, blank=True)
    simulator_duration = models.DurationField(default=datetime.timedelta(days=0), blank=True, null=True)
    simulator_instructor = models.CharField(max_length=100, null=True, blank=True)

# This is the main core of the Flight object, this model must be fetched using the date, departure airport, arrival airport
class FlightData(models.Model):
    date = models.DateField(null=True, blank=True)
    departure_airport = models.CharField(max_length=100, blank=True)
    arrival_airport = models.CharField(max_length=100, blank=True)
    take_off_time = models.TimeField(blank=True, null=True)
    landing_time = models.TimeField(blank=True, null=True)
    on_block_time = models.DurationField(default=datetime.timedelta(days=0), blank=True, null=True)
    flight_time = models.DurationField(default=datetime.timedelta(days=0), blank=True, null=True)
    block_departure = models.TimeField(blank=True, null=True)
    block_arrive = models.TimeField(blank=True, null=True)

#these are all the durations that are represented in the previous_experience and Total_experience
#once added we sum the values of the flighthours objects with corresponding previous_experience to return Total_experience
class FlightHours(models.Model):
    single_engine_time = models.DurationField(default=datetime.timedelta(days=0))
    multi_engine_time = models.DurationField(default=datetime.timedelta(days=0))
    multi_pilot_time = models.DurationField(default=datetime.timedelta(days=0))
    total_time = models.DurationField(default=datetime.timedelta(days=0))
    night_flight_time = models.DurationField(default=datetime.timedelta(days=0))
    ifr_flight_time = models.DurationField(default=datetime.timedelta(days=0))
    pic_time = models.DurationField(default=datetime.timedelta(days=0), blank=True)
    copilot_time = models.DurationField(default=datetime.timedelta(days=0), blank=True)
    dual_time = models.DurationField(default=datetime.timedelta(days=0), blank=True)
    instructor_time = models.DurationField(default=datetime.timedelta(days=0), blank=True)

# Events are optional fields that describes the possible problems that have occurred during the flight.
# the flights can be filtered based on asr_field object
class Events(models.Model):
    remarks = models.CharField(max_length=1000, blank=True, null=True)
    event_description = models.CharField(max_length=1000, blank=True, null=True)
    asr_filed = models.BooleanField(default=False, blank=True, null=True)
    auto_land = models.BooleanField(default=False, blank=True, null=True)

# this creates a flight object, represented on the logbook as a single entry row once saved by the user.
class Flight(models.Model):
    pilot = models.ForeignKey(Pilot, on_delete=models.PROTECT, null=True, blank=True)
    flight_data = models.ForeignKey(FlightData, on_delete=models.CASCADE, null=True, blank=True)
    crew_members_data = models.ForeignKey(CrewMembers, on_delete=models.CASCADE, null=True, blank=True)
    flight_hours_data = models.ForeignKey(FlightHours, on_delete=models.CASCADE, null=True, blank=True)
    flight_conditions_data = models.ForeignKey(FlightConditions, on_delete=models.CASCADE, null=True, blank=True)
    aircraft_data = models.ForeignKey(Aircraft, on_delete=models.CASCADE, null=True, blank=True)
    events_data = models.ForeignKey(Events, on_delete=models.CASCADE, null=True, blank=True)
    simulator_data = models.ForeignKey(Simulator, on_delete=models.CASCADE, null=True, blank=True)


