from django.db import models

from django.contrib.auth.models import User
from django.db.models.signals import post_save, pre_save
from django.dispatch import receiver
from myuser.models import UserProfile
from company.models import Company
# Create your models here.
class Jobs(models.Model):
    POSITION_CHOICES = (
        ('P', 'Pilot'),
        ('C', 'Cabin Crew'),
        ('M', 'Maintenance'),
        ('O', 'Office'),
    )
    EXP_LV_CHOICES = (
        ('2', '2 years'),
        ('4', '4 years'),
        ('5', '5 years'),
        ('8', '8 years'),
        ('o', '8 years over'),
    )
    JOB_TYPE_CHOICES = (
        ('F', 'full time'),
        ('P', 'part time'),
    )
    company = models.ForeignKey(Company, on_delete=models.CASCADE, null=True)
    title = models.CharField(max_length=200,default = '')
    description = models.TextField(default = '')
    position = models.CharField(max_length=2, choices=POSITION_CHOICES, null=True, blank=True )
    exp_lv = models.CharField(max_length=2, choices=EXP_LV_CHOICES, null=True, blank=True )
    country = models.CharField(max_length=20, null=True, blank=True )
    job_type = models.CharField(max_length=2, choices=JOB_TYPE_CHOICES, null=True, blank=True )
    rate = models.FloatField(max_length=20, default=0, null=True)
    status = models.IntegerField(default=0, null=True)
    publish_date = models.DateField(auto_now_add=True, blank=True, null=True)
    def user(self):
        return self.company.user