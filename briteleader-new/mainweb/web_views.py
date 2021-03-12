from django.shortcuts import render_to_response
from bookings.models import BookingPrice, Booking
from django.views import generic
from wallet.models import StripeCustomer

class home(generic.TemplateView):
    template_name = 'mainweb/home.html'

    def bookings(self):
        return Booking.objects.all()

    def stripe_customers(self):
        return StripeCustomer.objects.all()
