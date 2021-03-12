from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save, pre_save
from django.dispatch import receiver
from myuser.models import UserProfile
# Create your models here.

"""
The professional object is created based on the selection made during signup 
If userprofile.position != Business -> is_professional = True -> Triggers creation of the Professional model
# All models are linked to the professional Model
# all the models can be Many except for The ProfessionalDocs
# the entry is made on the frontend as a form iso Linkedin
# the Content of all the fields once completed have to be Added together to create a CV, which can be ReadOnly and exportable as PDF.

# I kept all the Models seperate to enable individual updates.
# the user can UPDATE,CREATE,DELETE content of his professional Fields
"""



class Professional(models.Model):
    POSITION_CHOICES = (
        ('P', 'Pilot'),
        ('C', 'Cabin Crew'),
        ('M', 'Maintenance'),
        ('O', 'Office'),
    )
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    is_subscribed = models.BooleanField(default=False)
    overview = models.TextField(default = '')
    skills = models.TextField(default = '')
    position = models.CharField(max_length=2, choices=POSITION_CHOICES, null=True, blank=True )

    # @receiver(post_save, sender=UserProfile)
    # def create_professional(sender,instance, created, **kwargs):
    #     print(instance.position)
    #     # if instance.position is not None and instance.position != 'B':
    #     #     if not hasattr(instance, 'professional'):
    #     #         Professional.objects.create(user=instance.user, position=instance.position)
    #     if created:
    #         if not hasattr(instance, 'professional'):
    #             Professional.objects.create(user=instance.user, position=instance.position)


class ExperienceProfile(models.Model):
    pro = models.ForeignKey(Professional, on_delete=models.CASCADE, null=True)
    job_title = models.CharField(max_length=100, null=True, blank=True)
    company_name = models.CharField(max_length=100, null=True, blank=True)
    city = models.CharField(max_length=100, null=True, blank=True)
    country = models.CharField(max_length=100, null=True, blank=True)
    start_date = models.DateField()
    end_date = models.DateField()
    is_current_job = models.BooleanField(default=True)
    content = models.TextField(default='')

    # @receiver(post_save, sender=Professional)
    # def create_user_experience(sender, instance, created, **kwargs):
    #     if created:
    #         try:
    #             instance.experienceprofile
    #         except instance._meta.model.experienceprofile.RelatedObjectDoesNotExist as e:
    #             ExperienceProfile.objects.create(pro=instance)
    #             print('User Experience profile created successfully')


    def user(self):
        return self.pro.user

class EducationProfile(models.Model):
    pro = models.ForeignKey(Professional, on_delete=models.CASCADE, null=True)
    diploma = models.CharField(max_length=100, null=True, blank=True)
    school = models.CharField(max_length=100, null=True, blank=True)
    city = models.CharField(max_length=100, null=True, blank=True)
    country = models.CharField(max_length=100, null=True, blank=True)
    start_date = models.DateField()
    end_date = models.DateField()
    content = models.TextField(default='')

    # @receiver(post_save, sender=Professional)
    # def create_education_profile(sender, instance, created, **kwargs):
    #     if created:
    #         try:
    #             instance.educationprofile
    #         except instance._meta.model.educationprofile.RelatedObjectDoesNotExist as e:
    #             EducationProfile.objects.create(pro=instance)
    #             print('User Education profile created successfully')


    def user(self):
        return self.pro.user

class CompetenceProfile(models.Model):
    pro = models.ForeignKey(Professional, on_delete=models.CASCADE, null=True)
    subject = models.CharField(max_length=100, null=True, blank=True)
    level = models.CharField(max_length=100, null=True, blank=True)

    # @receiver(post_save, sender=Professional)
    # def create_competence_profile(sender, instance, created, **kwargs):
    #     if created:
    #         try:
    #             instance.competenceprofile
    #         except instance._meta.model.competenceprofile.RelatedObjectDoesNotExist as e:
    #             CompetenceProfile.objects.create(pro=instance)
    #             print('User Competence profile created successfully')

    def user(self):
        return self.pro.user


    def pro_id(self):
        return self.pro.id


class ProfessionalDocs(models.Model):
    pro = models.ForeignKey(Professional, on_delete=models.CASCADE, null=True)
    passport = models.FileField(null=True)
    license = models.FileField(null=True)
    medical = models.FileField(null=True)
    recommendation_letter = models.FileField(null=True)
    employer_letter = models.FileField(null=True)
    logbook = models.FileField(null=True) #this field optionally can
                                          # be populated by taking the last 45 entries of the Logbook model.
                                          # Which have been formated to pdf as described in the logbook app
