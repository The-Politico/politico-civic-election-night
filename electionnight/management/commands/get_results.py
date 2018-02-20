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
        script_args = [
            'bash',
            '../electionnight/bin/results.sh',
            '-d',
            options['election_date']
        ]

        if options['test']:
            script_args.extend(['-t', '--test'])

        subprocess.run(script_args)


