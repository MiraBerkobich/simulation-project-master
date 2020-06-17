# Generated by Django 3.0.5 on 2020-05-04 11:48

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('scrum', '0002_task'),
    ]

    operations = [
        migrations.AddField(
            model_name='project',
            name='budget',
            field=models.PositiveIntegerField(default=0, verbose_name='Бюджет'),
        ),
        migrations.AddField(
            model_name='task',
            name='active',
            field=models.BooleanField(default=True, verbose_name='Задача изначально неактивна'),
        ),
        migrations.CreateModel(
            name='Sprint',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('deadline', models.IntegerField(choices=[(7, '7'), (14, '14'), (21, '21')], default=7)),
                ('project', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='scrum.Project')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
