# Generated by Django 2.0.8 on 2018-11-03 15:45

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('electionnight', '0010_auto_20181103_1402'),
    ]

    operations = [
        migrations.AlterField(
            model_name='pagecontent',
            name='featured',
            field=models.ManyToManyField(blank=True, limit_choices_to={'election_day__slug': '2018-11-06'}, to='election.Election'),
        ),
    ]
