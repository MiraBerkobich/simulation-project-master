# Generated by Django 3.0.5 on 2020-05-20 09:31

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('scrum', '0015_rating_time'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='rating',
            name='time',
        ),
    ]
