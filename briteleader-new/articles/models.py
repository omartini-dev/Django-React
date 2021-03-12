from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone

# Articles can be created / Updated by any User, Many = True
# Deletion of Articles
# Articles as the name are large contents written by the user for a specific Topic.
# the articles needs to be filtered by date, publisher, topic, title
def set_filename(instance, filename):
    return 'users/media/' + timezone.now().__str__() + filename

class Articles(models.Model):
    publisher = models.ForeignKey(User, on_delete=models.CASCADE, null=True)
    title = models.CharField(max_length=100, null=True)
    topic = models.CharField(max_length=100, blank=True, null=True)
    content = models.TextField(editable=True)
    pub_date = models.DateTimeField(auto_now_add=True)
    references = models.CharField(max_length=100, blank=True, null=True)
    links = models.URLField(null=True, blank=True)
    like = models.IntegerField(default=0)
    media = models.ImageField('photo of article', upload_to=set_filename, blank=True, null=True,
                               default='')
    def user(self):
        return self.user

# Users registred can post / edit / delete comments related to the above Article
class Comments(models.Model):
    commenter = models.ForeignKey(User, on_delete=models.CASCADE, null=True)
    article = models.ForeignKey(Articles, null=True, on_delete=models.CASCADE)
    text = models.TextField(editable=True, blank=True, null=True)
    date = models.DateTimeField(auto_now_add=True)

    def user(self):
        return self.user