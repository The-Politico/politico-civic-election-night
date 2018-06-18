from django.core.management.base import BaseCommand
from electionnight.celery import call_race_in_slack, call_race_on_twitter


class Command(BaseCommand):
    help = 'Sends a test call to Slack/Twitter bots'

    def add_arguments(self, parser):
        pass

    def handle(self, *args, **options):
        payload = {
            "race_id": '6239',
            "election_date": "06/26/18",
            "division": 'Colorado',
            "division_slug": 'colorado',
            "office": 'U.S. House, Colorado, District 2',
            "candidate": 'Mark Williams',
            "primary_party": 'Democrat',
            "vote_percent": 0.55,
            "vote_count": 25671,
            "runoff": False,
            "precincts_reporting_percent": 1,
            "jungle": False,
            "runoff_election": False,
            "special_election": False
        }

        call_race_in_slack.delay(payload)
        call_race_on_twitter.delay(payload)
