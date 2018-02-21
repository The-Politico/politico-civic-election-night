import os
import subprocess

from django.core.management.base import BaseCommand
from shlex import quote

from django.conf import settings as project_settings
from electionnight.conf import settings as app_settings


class Command(BaseCommand):
    help = (
        'Run the results processing script'
    )

    def add_arguments(self, parser):
        parser.add_argument('election_date', type=str)
        parser.add_argument(
            '--test',
            dest='test',
            action='store_true'
        )

    def handle(self, *args, **options):
        cmd_path = os.path.dirname(os.path.realpath(__file__))
        bash_script = os.path.join(cmd_path, '../../bin/results.sh')
        output_dir = os.path.join(
            project_settings.BASE_DIR,
            app_settings.RESULTS_STATIC_DIR,
            'election-config'
        )

        script_args = [
            'bash',
            bash_script,
            '-o',
            os.path.normpath(output_dir),
            '-d',
            options['election_date'],
        ]

        if options['test']:
            script_args.extend(['-t'])

        subprocess.run(script_args)
