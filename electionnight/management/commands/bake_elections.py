from django.core.management.base import BaseCommand
from election.models import ElectionDay
from electionnight.views import StatePage
from geography.models import DivisionLevel
from tqdm import tqdm


# TODO: Clean this up and split methods out...
class Command(BaseCommand):
    help = 'Publishes an election!'

    def add_arguments(self, parser):
        parser.add_argument(
            'election_dates',
            nargs='+',
            help="Election dates to publish."
        )

    def fetch_states(self, elections):
        """
        Returns the unique divisions for all elections on an election day.
        """
        state_level = DivisionLevel.objects.get(name=DivisionLevel.STATE)
        return list(set([
            election.division
            for election in elections
            if election.division.level == state_level
        ]))

    def bake_state_pages(self, elections):
        states = self.fetch_states(elections)
        self.stdout.write(self.style.SUCCESS('Baking state pages.'))
        for state in tqdm(states):
            self.stdout.write('> {}'.format(state.name))
            kwargs = {
                'state': state.slug,
                'year': self.ELECTION_DAY.cycle.slug,
                'election_date': str(self.ELECTION_DAY.date)
            }
            view = StatePage(**kwargs)
            view.publish_statics()
            view.publish_template(**kwargs)

            sample_election = elections.filter(division=state).first()
            if sample_election.election_type.is_primary():
                view.publish_statics(subpath='primary/')
                view.publish_template(subpath='primary/', **kwargs)
            # TODO: If general or primary runoff...

    def handle(self, *args, **options):
        election_dates = options['election_dates']
        for date in election_dates:
            election_day = ElectionDay.objects.get(
                date=date
            )
            self.ELECTION_DAY = election_day
            elections = election_day.elections.filter(race__special=False)
            self.bake_state_pages(elections)
