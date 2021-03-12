from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save, pre_save
from django.dispatch import receiver
from myuser.models import UserProfile
from django.utils import timezone
# Create your models here.

"""
This model is created if userprofile.position == 'B'
this value turns the is_company to True and has to trigger creation of this Model
"""
def set_aircraft_filename(instance, filename):
    return 'users/aircraft/' + filename + timezone.now().__str__()

class Company(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    is_partner = models.BooleanField(default=False, help_text='If we have company agreement with them')
    is_authorized = models.BooleanField(default=False, help_text='if they paid access to data')
    establish = models.DateField(null=True, blank=True)
    employees = models.IntegerField(default=0)

    def __init__(self, *args, **kwargs):
        super(Company, self).__init__(*args, **kwargs)
        self.__previous_is_company = self.user.userprofile.is_company


    def __save__(self, *args, **kwargs):
        super(Company, self).save(*args, **kwargs)
        if self.user.userprofile.is_company != self.__previous_is_company:
            print('company profile created')



# general Company profile that describes what is the company doing , it's size ...
# can be viewed by users when they want to learn about the company.
# the company List , will list all the companies in the frontend , and this is used as a company detail
class CompanyProfile(models.Model):
    company = models.ForeignKey(Company, on_delete=models.CASCADE, null=True)
    description = models.CharField(max_length=1000, null=True, blank=True)
    type = models.CharField(max_length=100, null=True, blank=True ,
                            help_text='Choices whether airline , catering ....')
    type_of_operation = models.CharField(max_length=100, blank=True, null=True,
                                         help_text='Choices ex Charter, Low Cost, Regular')
    aircraft_type = models.CharField(max_length=100, null=True, blank=True,
                                     help_text='Type of aircrafts operated by the airline ex. B777 - B787 as list')
    aircraft_number = models.IntegerField(default=0)
    destinations = models.CharField(max_length=100, null=True, blank=True,
                                    help_text='Many True, list of continents where they operate')
    base = models.CharField(max_length=100, null=True, blank=True, help_text='city where the company is based')
    aircraft_image = models.ImageField('cover image of aircraft', upload_to=set_aircraft_filename, blank=True, null=True,
                               default='users/aircraft/blank-avatar.jpg')
    def user(self):
        return self.company.user



#The company can set Benefit Values that are common to all their employees Which is accessible to any User
class CompanyGeneralBenefits(models.Model):
    # simple form that gives overview of general Company Benefits
    company = models.OneToOneField(Company, on_delete=models.CASCADE, null=True)
    offer_housing = models.BooleanField(default=False)
    offer_id_tickets_self = models.BooleanField(default=True)
    offer_id_tickets_family = models.BooleanField(default=True)
    offer_id_tickets_extended_family = models.BooleanField(default=True)
    offer_id_tickets_friends = models.BooleanField(default=True)
    offer_education_allowance = models.BooleanField(default=False)
    offer_end_of_service_benefits = models.BooleanField(default=False)
    offer_pension = models.BooleanField(default=False)
    offer_life_insurance = models.BooleanField(default=False)
    offer_health_insurance_self = models.BooleanField(default=True)
    offer_health_insurance_family = models.BooleanField(default=True)
    offer_loss_of_license = models.BooleanField(default=True)
    has_code_share_aggreement = models.BooleanField(default=False)
    has_alliance = models.BooleanField(default=False)
    alliance_name  = models.CharField(max_length=200, null=True, blank=True,
                                      help_text='ex OneWorld, StarAlliance ...')

# required docs specific to the Job offer that the company manager can create and manage
class RequiredDocs(models.Model):
    passport = models.BooleanField(default=True)
    licence_copy = models.BooleanField(default=True)
    resume = models.BooleanField(default=False)
    recommendation_letter = models.BooleanField(default=False)
    copy_logbook = models.BooleanField(default=False)
    other = models.CharField(max_length=100, null=True, blank=True, help_text='To be specified')

# Job requirements specific to the Job offer that the company manager can create and manage
class JobRequirements(models.Model):
    experience = models.CharField(max_length=100, blank=True, null=True, help_text='Can be Number of years, '
                                                                                   'Aircrafts experience, Flight hours ,'
                                                                                   'position or combination of all')
    qualifications = models.CharField(max_length=100, blank=True, null=True)
    age_limit = models.CharField(max_length=100, blank=True, null=True)
    education = models.CharField(max_length=100, blank=True, null=True)
    other = models.CharField(max_length=100, blank=True, null=True)
    documents_required = models.ForeignKey(RequiredDocs, on_delete=models.CASCADE)


# Selection process specific to the Job offer
class SelectionProcess(models.Model):
    interview = models.BooleanField(default=True)
    simulator = models.BooleanField(default=True)
    technical_exam = models.BooleanField(default=True)
    group_assessment = models.BooleanField(default=False)
    medical_check = models.BooleanField(default=False)
    done_at_headquarter = models.BooleanField(default=True)


# The actual Job offer that will be posted and viewed by the users ( the company manager can create Many Job Offers )
# This model is the main searchable item.
# Users can filter / search the CompanyJobOffers based on company_name, location(city/ country), job_title, contrat_type
class CompanyJobOffer(models.Model):
    company = models.OneToOneField(Company, on_delete=models.CASCADE)
    benefits = models.ForeignKey(CompanyGeneralBenefits, null=True, on_delete=models.CASCADE)
    requirements = models.ForeignKey(JobRequirements, on_delete=models.CASCADE)
    selection_process = models.ForeignKey(SelectionProcess, on_delete=models.CASCADE)
    job_title = models.CharField(max_length=250, null=True, blank=True)
    position_offered = models.CharField(max_length=100, null=True, blank=True, help_text='ex Captain B777')
    location = models.CharField(max_length=100, null=True, blank=True)
    job_description = models.CharField(max_length=10000, null=True, blank=True)
    salary = models.IntegerField(default=0, blank=True, null=True)
    salary_interval = models.CharField(max_length=10, blank=True, null=True,
                                       help_text='per month / per year')
    contract_type = models.CharField(max_length=100, blank=True, null=True,
                                     help_text='CDI (undetermined duration or CDD fix term')
    contract_duration = models.CharField(max_length=10, blank=True, null=True,
                                         help_text='Choices are value or undetermined')


