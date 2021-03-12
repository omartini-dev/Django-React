# Generated by Django 2.2.8 on 2020-01-10 12:07

import articles.models
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('articles', '0004_comments_commenter'),
    ]

    operations = [
        migrations.AddField(
            model_name='articles',
            name='like',
            field=models.IntegerField(default=0),
        ),
        migrations.AddField(
            model_name='articles',
            name='media',
            field=models.ImageField(blank=True, default='', null=True, upload_to=articles.models.set_filename, verbose_name='photo of article'),
        ),
    ]