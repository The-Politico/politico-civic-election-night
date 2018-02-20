import json
import subprocess

from django.core.management.base import BaseCommand

import election.models as election
from electionnight.models import APElectionMeta
import entity.models as entity
import geography.models as geography
import government.models as government
import vote.models as vote


class Command(BaseCommand):
    help = (
        'Bootstraps election meta for all elections in AP data.'
    )

    def get_division(self, row):
        """
        Gets the Division object for the given row of election results.
        """

        kwargs = {
            'level__name': row['level']
        }

        if row['reportingunitname']:
            name = row['reportingunitname']
        else:
            name = row['statename']

        if row['level'] in [
            geography.DivisionLevel.COUNTY,
            geography.DivisionLevel.TOWNSHIP
        ]:
            kwargs['code'] = row['fipscode']
        else:
            kwargs['name'] = name

        return geography.Division.objects.get(**kwargs)

    def get_office(self, row, division):
        """
        Gets the Office object for the given row of election results.
        Depends on knowing the division of the row of election results.
        """

        if division.level.name not in [
            geography.DivisionLevel.STATE,
            geography.DivisionLevel.COUNTRY
        ]:
            state = division.parent
        else:
            state = division

        if row['officename'] == 'President':
            return government.Office.objects.get(
                label='President',
                name='President of the United States'
            )
        elif row['officename'] == 'Governor':
            jurisdiction = government.Jurisdiction.objects.get(
                division=state
            )

            return government.Office.objects.get(
                slug__endswith='governor',
                jurisdiction=jurisdiction
            )
        elif row['officename'] == 'U.S. Senate':
            body = government.Body.objects.get(
                label='U.S. Senate'
            )
            return government.Office.objects.get(
                body=body,
                division=state,
                senate_class=self.senate_class
            )
        elif row['officename'] == 'U.S. House':
            body = government.Body.objects.get(
                label='U.S. House of Representatives'
            )
            district = state.children.get(
                level__name=geography.DivisionLevel.DISTRICT,
                code=row['seatnum'].zfill(2) if int(row['seatnum']) < 10 else row['seatnum']
            )
            return government.Office.objects.get(
                body=body,
                division=district
            )

    def get_race(self, row, division):
        """
        Gets the Race object for the given row of election results.

        In order to get the race, we must know the office. This function
        will get the office as well.

        The only way to know if a Race is a special is based on the string
        of the `racetype` field from the AP data.
        """

        office = self.get_office(row, division)

        return election.Race.objects.get(
            office=office,
            cycle__name=row['electiondate'].split('-')[0],
            special=row['racetype'].startswith('Special')
        )

    def get_election(self, row, race):
        """
        Gets the Election object for the given row of election results.
        Depends on knowing the Race object.

        If this is the presidential election, this will determine the
        Division attached to the election based on the row's statename.

        This function depends on knowing the Race object from `get_race`.
        """
        election_day = election.ElectionDay.objects.get(
            date=row['electiondate'],
        )

        if row['racetypeid'] in ['D', 'E']:
            party = government.Party.objects.get(ap_code='Dem')
        elif row['racetypeid'] in ['R', 'S']:
            party = government.Party.objects.get(ap_code='GOP')
        else:
            party = None

        return election.Election.objects.get(
            election_day=election_day,
            division=race.office.division,
            race=race,
            party=party
        )

    def get_or_create_party(self, row):
        """
        Gets or creates the Party object based on AP code of the row of
        election data.

        All parties that aren't Democratic or Republican are aggregable.
        """
        if row['party'] in ['Dem', 'GOP']:
            aggregable = False
        else:
            aggregable = True

        defaults = {
            'label': row['party'],
            'aggregate_candidates': aggregable
        }

        party, created = government.Party.objects.get_or_create(
            ap_code=row['party'],
            defaults=defaults
        )

        return party

    def get_or_create_person(self, row):
        """
        Gets or creates the Person object for the given row of AP data.
        """
        person, created = entity.Person.objects.get_or_create(
            first_name=row['first'],
            last_name=row['last']
        )

        return person

    def get_or_create_candidate(self, row, party, race):
        """
        Gets or creates the Candidate object for the given row of AP data.

        In order to tie with live data, this will synthesize the proper
        AP candidate id.

        This function also calls `get_or_create_person` to get a Person
        object to pass to Django.
        """

        person = self.get_or_create_person(row)

        id_components = row['id'].split('-')
        candidate_id = '{0}-{1}'.format(
            id_components[1],
            id_components[2]
        )

        defaults = {
            'party': party
        }

        candidate, created = election.Candidate.objects.get_or_create(
            person=person,
            race=race,
            ap_candidate_id=candidate_id,
            defaults=defaults)

        return candidate

    def get_or_create_candidate_election(
        self, row, election, candidate, party
    ):
        """
        For a given election, this function updates or creates the
        CandidateElection object using the model method on the election.
        """
        return election.update_or_create_candidate(
            candidate, party.aggregate_candidates
        )

    def get_or_create_ap_election_meta(self, row, election):
        """
        Gets or creates the APElectionMeta object for the given row of
        AP data.
        """
        APElectionMeta.objects.get_or_create(
            ap_election_id=row['raceid'],
            election=election
        )

    def get_or_create_votes(self, row, division, candidate_election):
        """
        Gets or creates the Vote object for the given row of AP data.
        """

        vote.Votes.objects.get_or_create(
            division=division,
            count=row['votecount'],
            pct=row['votepct'],
            winning=row['winner'],
            candidate_election=candidate_election
        )

    def process_row(self, row):
        """
        Processes a row of AP election data to determine what model objects
        need to be created.
        """
        print('Processing {0} {1} {2} {3}'.format(
            row['statename'],
            row['level'],
            row['last'],
            row['officename']
        ))

        division = self.get_division(row)
        race = self.get_race(row, division)
        election = self.get_election(row, race)

        party = self.get_or_create_party(row)
        candidate = self.get_or_create_candidate(row, party, race)
        candidate_election = self.get_or_create_candidate_election(
            row, election, candidate, party
        )

        self.get_or_create_ap_election_meta(row, election)
        self.get_or_create_votes(row, division, candidate_election)

    def add_arguments(self, parser):
        parser.add_argument('election_date', type=str)
        parser.add_argument(
            '--senate_class',
            dest='senate_class',
            action='store',
            default='1'
        )
        parser.add_argument(
            '--test',
            dest='test',
            action='store_true',
        )

    def handle(self, *args, **options):
        """
        This management command gets data for a given election date from
        elex. Then, it loops through each row of the data and calls
        `process_row`.

        In order for this command to work, you must have bootstrapped all
        of the dependent apps: entity, geography, government, election, vote,
        and almanac.
        """
        self.senate_class = options['senate_class']

        writefile = open('bootstrap.json', 'w')
        elex_args = [
            'elex',
            'results',
            options['election_date'],
            '-o',
            'json',
            '--national-only'
        ]
        if options['test']:
            elex_args.append('-t')
        subprocess.run(elex_args, stdout=writefile)

        with open('bootstrap.json', 'r') as readfile:
            data = json.load(readfile)
            for row in data:
                if row['level'] == geography.DivisionLevel.TOWNSHIP:
                    continue
                self.process_row(row)