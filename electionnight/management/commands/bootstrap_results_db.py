import json
import subprocess

from django.core.management.base import BaseCommand
from django.core.management import call_command
from tqdm import tqdm

from election.models import Candidate, CandidateElection
from electionnight.models import APElectionMeta
from vote.models import Votes


class Command(BaseCommand):
    help = (
        'Ingests master results JSON file from Elex and updates the results '
        'models in Django.'
    )

    def add_arguments(self, parser):
        parser.add_argument('election_date', type=str)
        parser.add_argument(
            '--test',
            dest='test',
            action='store_true',
        )
        parser.add_argument(
            '--download',
            dest='download',
            action='store_true'
        )

    def download_results(self, options):
        writefile = open('master.json', 'w')
        elex_args = [
            'elex',
            'results',
            options['election_date'],
            '--national-only',
            '-o',
            'json',
        ]

        if options['test']:
            elex_args.append('-t')

        subprocess.run(elex_args, stdout=writefile)

    def process_result(self, result):
        if result['is_ballot_measure']:
            return

        if result['level'] != 'state':
            return

        ap_meta = APElectionMeta.objects.get(
            ap_election_id=result['raceid'],
        )

        id_components = result['id'].split('-')
        candidate_id = '{0}-{1}'.format(
            id_components[1],
            id_components[2]
        )
        candidate = Candidate.objects.get(
            ap_candidate_id=candidate_id
        )

        candidate_election = CandidateElection.objects.get(
            election=ap_meta.election,
            candidate=candidate
        )

        filter_kwargs = {
            'candidate_election': candidate_election,
            'division': ap_meta.election.division
        }

        kwargs = {}

        if not ap_meta.override_ap_votes:
            kwargs['count'] = result['votecount']
            kwargs['pct'] = result['votepct']

        if not ap_meta.override_ap_call:
            kwargs['winning'] = result['winner']
            kwargs['runoff'] = result['runoff']

        Votes.objects.filter(**filter_kwargs).update(**kwargs)

    def handle(self, *args, **options):
        if options['download']:
            self.download_results(options)

        with open('master.json') as f:
            data = json.load(f)

        for result in tqdm(data):
            self.process_result(result)

        call_command(
            'bake_elections',
            options['election_date'],
        )
