import os
import subprocess

from django.core.management.base import BaseCommand


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
        script_args = [
            'bash',
            bash_script,
            '-d',
            options['election_date']
        ]

        if options['test']:
            script_args.extend(['-t', '--test'])

        subprocess.run(script_args)
