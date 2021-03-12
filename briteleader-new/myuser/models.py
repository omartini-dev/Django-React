from django.db import models
from django.utils.translation import gettext as _
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.utils import timezone
from briteleader.utils import send_mail_to_admin


def set_filename(instance, filename):
    return 'users/avatar/' + filename + timezone.now().__str__()

def set_cover_filename(instance, filename):
    return 'users/cover/' + filename + timezone.now().__str__()

class Languages(models.Model):
    title = models.CharField(max_length=20, blank=True, null=True)

    def __str__(self):
        return self.title


class Newsletter(models.Model):
    email = models.CharField(max_length=100, null=True, blank=True, unique=True)
    subscription_date = models.DateTimeField(auto_now=True)
    country = models.CharField(max_length=100, null=True, blank=True)
    active_subscription = models.BooleanField(default=True)

class UserProfile(models.Model):

    TYPE_CHOICES = (
        ('I', _('individual')),
        ('C', _('company'))
    )
    POSITION_CHOICES = (
        ('P', 'Pilot'),
        ('C', 'Cabin Crew'),
        ('M', 'Maintenance'),
        ('O', 'Office'),
        ('B', 'Business'),
    )
    type = models.CharField(max_length=2, blank=True, default='I', choices=TYPE_CHOICES)
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    avatar = models.ImageField('photo of profile', upload_to=set_filename, blank=True, null=True,
                               default='users/avatar/blank-avatar.jpg')
    company_name = models.CharField(max_length=100, null=True, blank=True)
    birth_date = models.DateField(null=True, blank=True)
    address_1 = models.CharField('address 1 ', max_length=150, blank=True)
    address_2 = models.CharField('address 2 ', max_length=150, blank=True)
    city = models.CharField(max_length=20, blank=True, null=True)
    zip_code = models.CharField('Zip Code', max_length=20, blank=True, null=True)
    state = models.CharField(max_length=20, blank=True, null=True)
    country = models.CharField(max_length=20, blank=True, null=True)
    phone_number = models.CharField(max_length=100, blank=True, null=True)
    position = models.CharField(max_length=2, choices=POSITION_CHOICES, null=True, blank=True )
    send_sms_user = models.BooleanField(default=True)
    is_restricted_user = models.BooleanField(default=True)
    is_company = models.BooleanField(default=False)
    is_professional = models.BooleanField(default=False)
    following = models.IntegerField(default=0)
    follower = models.IntegerField(default=0)
    desc = models.CharField(max_length=100, blank=True, null=True)
    cover = models.ImageField('cover image of profile', upload_to=set_cover_filename, blank=True, null=True,
                               default='users/cover/blank-avatar.jpg')
    social_link1 = models.CharField(max_length=100, blank=True, null=True)
    social_link2 = models.CharField(max_length=100, blank=True, null=True)
    overview = models.TextField(default = '')
    is_subscribed = models.BooleanField(default=False)

    def __str__(self):
        return self.user.email

    def last_name_short(self):
        return '%s.' %(self.user.last_name[0].capitalize())


    def get_type(self):
        TYPES = {
            'I': 'individual',
            'C': 'company'
        }
        return TYPES[self.type]

    class Meta:
        verbose_name = 'Profile'

    verbose_name_plural = 'Profiles'


    @receiver(post_save, sender=User)
    def create_user_profile(sender, instance, created, **kwargs):
        if created:
            try: 
                instance.userprofile
            except instance._meta.model.userprofile.RelatedObjectDoesNotExist as e: 
                UserProfile.objects.create(user=instance)
                print('Userprofile created successful')


    @receiver(post_save, sender=User)
    def save_profile(sender, instance, **kwargs):
        instance.userprofile.save()
        print('Userprofile saved.')

    @property
    def user_role(self):
        if self.position == 'B':
            self.is_company = True
        else:
            self.is_professional = True
        return self.user_role


    def user_email(self):
        return self.user.email

    def get_chat_data(self):
        return {
            'first_name' : self.user.first_name,
            'last_name':self.user.last_name,
            'company_name':self.company_name,
            'avatar':str(self.avatar),
            'is_company':self.is_company,
        }

class UserActivity(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    ip_address = models.CharField(max_length=20)
    path = models.CharField(max_length=100)
    method = models.CharField(max_length=10)
    time = models.DateTimeField(auto_now=True)
    location_latitude = models.FloatField(max_length=20, default=0, null=True)
    location_longitude = models.FloatField(max_length=20, default=0, null=True)
    city = models.CharField(max_length=50)
    body = models.CharField(max_length=1000)


class ContactUs(models.Model):
    email = models.CharField(max_length=250)
    message = models.CharField(max_length=1000)
    topic = models.CharField(max_length=100)


@receiver(post_save, sender=ContactUs)
def send_contact_us_email(sender, instance, created, **kwargs):
    template = 'support_email.html'
    if created:
        send_mail_to_admin("Support email", template, {"data": instance})


class MyUser(object):
    def __init__(self, user):
        self.user = user
