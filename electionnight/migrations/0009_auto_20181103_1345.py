# Generated by Django 2.0.8 on 2018-11-03 13:45

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('electionnight', '0008_auto_20181017_1803'),
    ]

    operations = [
        migrations.AlterField(
            model_name='pagetype',
            name='division_level',
            field=models.ForeignKey(blank=True, help_text='Set for all page types except generic election day', null=True, on_delete=django.db.models.deletion.CASCADE, to='geography.DivisionLevel'),
        ),
        migrations.AlterField(
            model_name='pagetype',
            name='model_type',
            field=models.ForeignKey(limit_choices_to=models.Q(models.Q(('app_label', 'geography'), ('model', 'division')), models.Q(('app_label', 'government'), ('model', 'office')), models.Q(('app_label', 'government'), ('model', 'body')), models.Q(('app_label', 'election'), ('model', 'election_day')), _connector='OR'), on_delete=django.db.models.deletion.CASCADE, to='contenttypes.ContentType'),
        ),
    ]
