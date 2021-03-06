# Generated by Django 2.2.8 on 2020-01-20 04:25

from django.db import migrations, models
import documentation.models


class Migration(migrations.Migration):

    dependencies = [
        ('documentation', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='documentation',
            name='file',
            field=models.FileField(help_text='This is usualy a PDF file, that needs to be protected against downloads', upload_to=documentation.models.user_directory_path),
        ),
    ]
