# Generated by Django 2.2.7 on 2019-12-07 13:22

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('professional', '0003_auto_20191125_0500'),
    ]

    operations = [
        migrations.AddField(
            model_name='professional',
            name='overview',
            field=models.TextField(default=''),
        ),
    ]
