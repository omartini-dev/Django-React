from django.contrib import admin
from .models import *
from django.contrib.contenttypes.admin import GenericTabularInline
# Register your models here.




class FlightInline(admin.StackedInline):
    model = Flight
    extra = 1


class PilotAdmin(admin.ModelAdmin):
    inlines = (FlightInline, )

admin.site.register(Pilot, PilotAdmin,)
admin.site.register(Aircraft)
admin.site.register(FlightConditions)
admin.site.register(FlightData)
admin.site.register(Flight)
admin.site.register(CrewMembers)
admin.site.register(Events)
admin.site.register(Simulator)
admin.site.register(FlightHours)