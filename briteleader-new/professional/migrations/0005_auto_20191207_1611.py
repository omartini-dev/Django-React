# Generated by Django 2.2.7 on 2019-12-07 16:11

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('professional', '0004_professional_overview'),
    ]

    operations = [
        migrations.AddField(
            model_name='educationprofile',
            name='content',
            field=models.TextField(default=''),
        ),
        migrations.AddField(
            model_name='experienceprofile',
            name='content',
            field=models.TextField(default=''),
        ),
    ]
