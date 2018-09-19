from django.core.management.base import BaseCommand
from election.models import ElectionDay
from geography.models import DivisionLevel
from rest_framework.renderers import JSONRenderer
from tqdm import tqdm

from electionnight.serializers import BodySerializer, StateSerializer
from electionnight.utils.aws import defaults, get_bucket


# TODO: Clean this up and split methods out...
class Command(BaseCommand):
    help = "Publishes an election!"

    def add_arguments(self, parser):
        parser.add_argument(
            "election_dates", nargs="+", help="Election dates to publish."
        )

    def fetch_states(self, elections):
        """
        Returns the unique divisions for all elections on an election day.
        """
        states = []

        for election in elections:
            if election.division.level.name == DivisionLevel.DISTRICT:
                division = election.division.parent
            else:
                division = election.division

            states.append(division)

        return list(set(states))

    def fetch_bodies(self, elections):
        bodies = []

        for election in elections:
            if election.race.office.body:
                bodies.append(election.race.office.body)

        return list(set(bodies))

    def bake_states(self, elections):
        states = self.fetch_states(elections)
        self.stdout.write(self.style.SUCCESS("Baking state pages."))
        for state in tqdm(states):
            self.stdout.write("> {}".format(state.name))
            data = StateSerializer(
                state, context={"election_date": self.ELECTION_DAY.slug}
            ).data
            json_string = JSONRenderer().render(data)
            key = "election-results/2018/{}/context.json".format(state.slug)
            bucket = get_bucket()
            bucket.put_object(
                Key=key,
                ACL=defaults.ACL,
                Body=json_string,
                CacheControl=defaults.CACHE_HEADER,
                ContentType="application/json",
            )

    def bake_bodies(self, elections):
        bodies = self.fetch_bodies(elections)
        self.stdout.write(self.style.SUCCESS("Baking body pages."))
        for body in tqdm(bodies):
            self.stdout.write("> {}".format(body.label))
            data = BodySerializer(
                body, context={"election_date": self.ELECTION_DAY.slug}
            ).data
            json_string = JSONRenderer().render(data)
            key = "election-results/2018/{}/context.json".format(body.slug)
            bucket = get_bucket()
            bucket.put_object(
                Key=key,
                ACL=defaults.ACL,
                Body=json_string,
                CacheControl=defaults.CACHE_HEADER,
                ContentType="application/json",
            )

    def bake_state_bodies(self, elections):
        pass

    def handle(self, *args, **options):
        election_dates = options["election_dates"]
        for date in election_dates:
            election_day = ElectionDay.objects.get(date=date)
            self.ELECTION_DAY = election_day
            elections = election_day.elections.all()
            self.bake_states(elections)
            self.bake_bodies(elections)
            self.bake_state_bodies(elections)
