from django.db import models
from django.contrib.auth.models import User
from django.dispatch import receiver
# Create your models here.

class Chat(models.Model):
    sender = models.ForeignKey(User, on_delete=models.CASCADE, null=True, related_name='sender')
    listener = models.ForeignKey(User, on_delete=models.CASCADE, related_name='listener')
    message = models.TextField(default = '')
    flag = models.IntegerField(default = 0)
    created_at = models.DateTimeField(auto_now=True)
