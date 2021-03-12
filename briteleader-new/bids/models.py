from django.db import models

from django.contrib.auth.models import User
from django.db.models.signals import post_save, pre_save
from django.dispatch import receiver
from myuser.models import UserProfile
from professional.models import Professional
from jobs.models import Jobs
# Create your models here.
class Bids(models.Model):
    
    jobs = models.ForeignKey(Jobs, on_delete=models.CASCADE)
    professional = models.ForeignKey(Professional, on_delete=models.CASCADE, null=True)
    title = models.CharField(max_length=200,default = '')
    description = models.TextField(default = '')

    def user(self):
        return self.professional.user