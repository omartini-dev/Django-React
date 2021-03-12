from django.db import models
from django.contrib.auth.models import User
# Create your models here.



# We need to store large amount of Documentation Online
# Documentation that will be available to subscribed users Initial the access is restricted to Professionals only
def user_directory_path(instance, filename):
    return 'documentation/{0}/{1}'.format(instance.folder, filename)
def set_filename(instance, filename):
    return 'documentation/{0}/{1}'.format(instance.folder, 'cover_'+filename)

class Documentation(models.Model):
    title = models.CharField(max_length=100 , help_text='Documentation Title', default='Document')
    new_document = models.BooleanField(default=False)
    category = models.CharField(max_length=100 , help_text='Category of this documentation whether it is for Flight deck , cabin crew , maintenance ...')
    group = models.CharField(max_length=100, help_text='depending on the document it can be an airplane specific doc or other ex: Boeing ')
    type = models.CharField(max_length=100, help_text='this is to specify the type of Airplane the Doc is specific to ex: B777')
    folder = models.CharField(max_length=100, help_text='The title of the folder containing the documentation ex: FCOM')
    file = models.FileField(upload_to=user_directory_path, help_text='This is usualy a PDF file, that needs to be protected against downloads')
    cover = models.ImageField('Cover Image', upload_to=set_filename, blank=True, null=True)
    price = models.CharField(max_length=10, help_text='The price of the documentation', default='0')
    description = models.TextField(help_text='The description of the documentation', default='')
    publish_date = models.DateField(auto_now=True)

class PurchaseList(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True)
    doc = models.ForeignKey(Documentation, on_delete=models.CASCADE, null=True, blank=True)