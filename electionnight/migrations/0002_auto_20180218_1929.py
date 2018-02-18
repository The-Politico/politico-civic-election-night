# Generated by Django 2.0.2 on 2018-02-18 19:29

from django.db import migrations, models
import django.db.models.deletion
import django.db.models.query_utils
import uuid


class Migration(migrations.Migration):

    dependencies = [
        ('election', '0005_auto_20180206_2238'),
        ('contenttypes', '0002_remove_content_type_name'),
        ('geography', '0001_initial'),
        ('government', '0003_office_senate_class'),
        ('electionnight', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='PageContent',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('object_id', models.CharField(max_length=500)),
                ('special_election', models.BooleanField(default=False)),
                ('content_type', models.ForeignKey(limit_choices_to=django.db.models.query_utils.Q(django.db.models.query_utils.Q(('app_label', 'geography'), ('model', 'division'), _connector='AND'), django.db.models.query_utils.Q(('app_label', 'entity'), ('model', 'office'), _connector='AND'), django.db.models.query_utils.Q(('app_label', 'entity'), ('model', 'body'), _connector='AND'), django.db.models.query_utils.Q(('app_label', 'theshow'), ('model', 'pagetype'), _connector='AND'), _connector='OR'), on_delete=django.db.models.deletion.CASCADE, to='contenttypes.ContentType')),
                ('division', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.PROTECT, to='geography.Division')),
                ('election_day', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='election.ElectionDay')),
                ('parent', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.PROTECT, related_name='children', to='electionnight.PageContent')),
            ],
        ),
        migrations.CreateModel(
            name='PageContentBlock',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('content', models.TextField()),
                ('created', models.DateTimeField(auto_now_add=True)),
                ('updated', models.DateTimeField(auto_now=True)),
            ],
        ),
        migrations.CreateModel(
            name='PageContentType',
            fields=[
                ('slug', models.SlugField(blank=True, editable=False, max_length=255, primary_key=True, serialize=False, unique=True)),
                ('name', models.CharField(max_length=255)),
            ],
        ),
        migrations.CreateModel(
            name='PageType',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('body', models.ForeignKey(blank=True, help_text='Only set body for senate/house pages', null=True, on_delete=django.db.models.deletion.CASCADE, to='government.Body')),
                ('division_level', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='geography.DivisionLevel')),
                ('election_day', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='election.ElectionDay')),
                ('jurisdiction', models.ForeignKey(blank=True, help_text='Only set jurisdiction for federal pages', null=True, on_delete=django.db.models.deletion.CASCADE, to='government.Jurisdiction')),
                ('model_type', models.ForeignKey(limit_choices_to=django.db.models.query_utils.Q(django.db.models.query_utils.Q(('app_label', 'geography'), ('model', 'division'), _connector='AND'), django.db.models.query_utils.Q(('app_label', 'entity'), ('model', 'office'), _connector='AND'), django.db.models.query_utils.Q(('app_label', 'entity'), ('model', 'body'), _connector='AND'), _connector='OR'), on_delete=django.db.models.deletion.CASCADE, to='contenttypes.ContentType')),
                ('office', models.ForeignKey(blank=True, help_text='Only set office for the presidency', null=True, on_delete=django.db.models.deletion.CASCADE, to='government.Office')),
            ],
        ),
        migrations.AddField(
            model_name='pagecontentblock',
            name='content_type',
            field=models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='+', to='electionnight.PageContentType'),
        ),
        migrations.AddField(
            model_name='pagecontentblock',
            name='page',
            field=models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='blocks', to='electionnight.PageContent'),
        ),
        migrations.AlterUniqueTogether(
            name='pagetype',
            unique_together={('model_type', 'election_day', 'division_level', 'jurisdiction', 'body', 'office')},
        ),
        migrations.AlterUniqueTogether(
            name='pagecontentblock',
            unique_together={('page', 'content_type')},
        ),
        migrations.AlterUniqueTogether(
            name='pagecontent',
            unique_together={('content_type', 'object_id', 'election_day', 'division')},
        ),
    ]
