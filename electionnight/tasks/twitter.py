import os
from argparse import Namespace
from datetime import datetime
from urllib.parse import urlencode

import requests
import twitter
from celery import shared_task
from django.conf import settings
from electionnight.conf import settings as app_settings

CONSUMER_KEY = getattr(settings, 'CIVIC_TWITTER_CONSUMER_KEY', None)
CONSUMER_SECRET = getattr(settings, 'CIVIC_TWITTER_CONSUMER_SECRET', None)
ACCESS_TOKEN_KEY = getattr(settings, 'CIVIC_TWITTER_ACCESS_TOKEN_KEY', None)
ACCESS_TOKEN_SECRET = getattr(
    settings, 'CIVIC_TWITTER_ACCESS_TOKEN_SECRET', None)


def get_screenshot(
    division_slug, race_id, runoff_election, special_election, election_date
):
    state_path = division_slug
    if runoff_election:
        state_path = '{}/runoff'.format(state_path)

    if special_election:
        parsed = datetime.strptime(election_date, '%m/%d/%y')
        month = parsed.strftime('%b')
        day = parsed.strftime('%d')
        state_path = '{}/special-election/{}-{}'.format(
            state_path,
            month.lower(),
            day
        )

    if app_settings.AWS_S3_BUCKET == 'interactives.politico.com':
        start_path = '/election-results'
        end_path = ''
    else:
        start_path = '/staging.interactives.politico.com/election-results'
        end_path = 'index.html'
    query = urlencode({
        'path': '{}/2018/{}/{}'.format(
            start_path,
            state_path,
            end_path
        ),
        'selector': '.race-table-{}'.format(
            race_id
        ),
        'padding': '5px 0 0 10px'
    })
    root = 'http://politico-botshot.herokuapp.com/shoot/?'

    print('{}{}'.format(root, query))

    response = requests.get('{}{}'.format(root, query))

    folder = os.path.join(
        settings.BASE_DIR,
        'images'
    )

    if not os.path.exists(folder):
        os.makedirs(folder)

    with open('{}/{}.png'.format(folder, race_id), 'wb') as f:
        f.write(response.content)


def construct_status(
    party, candidate, office, runoff, division_slug, jungle, runoff_election,
    special_election, election_date
):
    party_labels = {
        'Democrat': 'Democratic',
        'Republican': 'Republican'
    }

    # determine winning language
    if runoff:
        winning_language = 'has advanced to a runoff in the'
    else:
        if jungle:
            winning_language = 'has advanced to the general election in the'
        else:
            winning_language = 'has won the'

    # determine race type
    if party:
        party_label = party_labels[party]
        if runoff_election:
            race_label = '{} primary runoff'.format(party_label)
        elif special_election:
            race_label = '{} special primary'.format(party_label)
        else:
            race_label = '{} primary'.format(party_label)
    elif jungle:
        race_label = 'open primary'
    else:
        if runoff_election:
            race_label = 'runoff election'
        elif special_election:
            race_label = 'special election'
        else:
            race_label = 'race'

    page_url = (
        'https://www.politico.com/election-results/2018'
        '/{}/'.format(division_slug)
    )
    if special_election:
        parsed = datetime.strptime(election_date, '%m/%d/%y')
        month = parsed.strftime('%b').lower()
        day = parsed.strftime('%d')
        page_url += 'special-election/{}-{}'.format(month, day)
    elif runoff_election:
        page_url += 'runoff'

    return ('🚨 NEW CALL: {} {} {} for {}. {}'.format(
        candidate, winning_language, race_label, office, page_url
    ))


@shared_task
def call_race_on_twitter(payload):
    payload = Namespace(**payload)

    get_screenshot(
        payload.division_slug,
        payload.race_id,
        payload.runoff_election,
        payload.special_election,
        payload.election_date
    )

    status = construct_status(
        payload.primary_party,
        payload.candidate,
        payload.office,
        payload.runoff,
        payload.division_slug,
        payload.jungle,
        payload.runoff_election,
        payload.special_election,
        payload.election_date
    )
    print(status)

    api = twitter.Api(
        consumer_key=CONSUMER_KEY,
        consumer_secret=CONSUMER_SECRET,
        access_token_key=ACCESS_TOKEN_KEY,
        access_token_secret=ACCESS_TOKEN_SECRET
    )

    with open('{}/images/{}.png'.format(
        settings.BASE_DIR, payload.race_id
    ), 'rb') as f:
        media_id = api.UploadMediaSimple(f)

    api.PostUpdate(
        status=status,
        media=[media_id]
    )
