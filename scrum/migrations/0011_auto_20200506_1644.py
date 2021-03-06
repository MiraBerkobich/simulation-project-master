# Generated by Django 3.0.5 on 2020-05-06 16:44

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('scrum', '0010_auto_20200505_1644'),
    ]

    operations = [
        migrations.AddField(
            model_name='question',
            name='client',
            field=models.BooleanField(default=False, verbose_name='Вопрос от клиента'),
        ),
        migrations.AddField(
            model_name='question',
            name='team',
            field=models.BooleanField(default=False, verbose_name='Вопрос от команды'),
        ),
        migrations.AlterField(
            model_name='question',
            name='task',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='questions', to='scrum.Task'),
        ),
    ]
