# Generated by Django 3.0.5 on 2020-06-09 10:00

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('scrum', '0020_auto_20200602_1059'),
    ]

    operations = [
        migrations.AlterField(
            model_name='question',
            name='complexity',
            field=models.IntegerField(choices=[(1, '1'), (2, '2'), (3, '3')], default=2, verbose_name='Сложность'),
        ),
        migrations.AlterField(
            model_name='question',
            name='task',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='questions', to='scrum.Task', verbose_name='Задача'),
        ),
    ]
