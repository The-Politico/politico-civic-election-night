import subprocess

from django.core.management.base import BaseCommand


class Command(BaseCommand):
    help = (
        'Run the results processing script'
    )

    def add_arguments(self, parser):
        parser.add_argument('election_date', type=str)

    def handle(self, *args, **options):
        subprocess.run([
            'bash',
            '../electionnight/bin/results.sh',
            '-d',
            options['election_date']
        ])
