# Generated by Django 3.0.5 on 2020-05-20 09:26

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('scrum', '0014_rating'),
    ]

    operations = [
        migrations.AddField(
            model_name='rating',
            name='time',
            field=models.DateTimeField(auto_now=True),
        ),
    ]
