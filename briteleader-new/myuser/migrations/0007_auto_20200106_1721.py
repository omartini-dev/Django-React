# Generated by Django 2.2.8 on 2020-01-06 17:21

from django.db import migrations, models
import myuser.models


class Migration(migrations.Migration):

    dependencies = [
        ('myuser', '0006_userprofile_desc'),
    ]

    operations = [
        migrations.AddField(
            model_name='userprofile',
            name='cover',
            field=models.ImageField(blank=True, default='users/cover/blank-avatar.jpg', null=True, upload_to=myuser.models.set_filename, verbose_name='cover iamge of profile'),
        ),
        migrations.AddField(
            model_name='userprofile',
            name='social_link1',
            field=models.CharField(blank=True, max_length=100, null=True),
        ),
        migrations.AddField(
            model_name='userprofile',
            name='social_link2',
            field=models.CharField(blank=True, max_length=100, null=True),
        ),
    ]