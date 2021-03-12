from django.db import models
from django.utils.translation import gettext as _
from myuser.models import UserProfile
# Create your models here.

class OAuth(models.Model):
    name = models.CharField(max_length=30)
    clientId = models.CharField(max_length=100)
    accessTokenUri = models.CharField(max_length=50)
    authorizationUri = models.CharField(max_length=50)
    redirectUri = models.CharField(max_length=150)
    state = models.CharField(max_length=50)
    scopes = models.CharField(max_length=50)
    responseType = models.CharField(max_length=50)
    loginpath = models.CharField(max_length=50)

    def __str__(self):
        return self.name
