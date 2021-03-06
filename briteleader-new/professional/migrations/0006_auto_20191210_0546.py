# Generated by Django 2.2.7 on 2019-12-10 05:46

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('professional', '0005_auto_20191207_1611'),
    ]

    operations = [
        migrations.AlterField(
            model_name='competenceprofile',
            name='pro',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='professional.Professional'),
        ),
        migrations.AlterField(
            model_name='educationprofile',
            name='pro',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='professional.Professional'),
        ),
        migrations.AlterField(
            model_name='experienceprofile',
            name='pro',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='professional.Professional'),
        ),
    ]
