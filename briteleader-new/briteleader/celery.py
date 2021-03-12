import os
from celery import Celery

os.environ['DJANGO_SETTINGS_MODULE']= 'briteleader.settings'

app = Celery('briteleader')
app.config_from_object('django.conf:settings')
app.autodiscover_tasks()

app.conf.beat_schedule = {
    'execute_authorized_payments': {
       'task': 'execute_authorized_payments',
       'schedule': 60,
       'args': (),
    },
    'handle_cancellations': {
      'task': 'handle_cancellations',
       'schedule': 20,
       'args': (),
    },
    'handle_dispute_fees': {
       'task': 'handle_dispute_fees',
       'schedule': 20,
       'args': (),
    },
    'set_booking_status_to_inprogress': {
       'task': 'set_booking_status_to_inprogress',
       'schedule': 60,
       'args': (),
    },
    'set_booking_status_to_completed': {
      'task': 'set_booking_status_to_completed',
      'schedule': 60,
      'args': (),
    },
    'set_booking_status_to_unrated': {
      'task': 'set_booking_status_to_unrated',
      'schedule': 60,
      'args': (),
    },
    'pay_providers': {
       'task': 'pay_providers',
       'schedule': 60,
       'args': (),
    },
    'handle_disputes': {
      'task': 'handle_disputes',
      'schedule': 60,
      'args': (),
    },
    'execute_refunds': {
      'task': 'execute_refunds',
      'schedule': 60,
      'args': (),
    },
    'execute_provider_payments': {
      'task': 'execute_provider_payments',
      'schedule': 60,
      'args': (),
    }
}