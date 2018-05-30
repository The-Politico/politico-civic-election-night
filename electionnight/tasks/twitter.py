import io
from argparse import Namespace
from urllib.parse import urlencode

import requests

import twitter
from celery import shared_task
from django.conf import settings

CONSUMER_KEY = getattr(settings, 'CIVIC_TWITTER_CONSUMER_KEY', None)
CONSUMER_SECRET = getattr(settings, 'CIVIC_TWITTER_CONSUMER_SECRET', None)
ACCESS_TOKEN_KEY = getattr(settings, 'CIVIC_TWITTER_ACCESS_TOKEN_KEY', None)
ACCESS_TOKEN_SECRET = getattr(
    settings, 'CIVIC_TWITTER_ACCESS_TOKEN_SECRET', None)


def get_screenshot(division_slug, race_id):
    query = urlencode({
        'path': '/election-results/2018/{}/'.format(
            division_slug
        ),
        'selector': '.results-table-{}'.format(
            race_id
        ),
        'padding': 5
    })
    root = 'http://politico-botshot.herokuapp.com/shoot/?'

    response = requests.get(
        '{}{}'.format(root, query)
    )
    return io.BytesIO(response.content)


def construct_status(party, candidate, office, runoff, division_slug):
    party_labels = {
        'Democrat': 'Democratic',
        'Republican': 'Republican'
    }
    # TODO: RUNOFF PAGES
    page_url = (
        'https://www.politico.com/election-results/2018'
        '/{}/'.format(division_slug)
    )
    # TODO: JUNGLE PRIMARIES
    if party:
        if runoff:
            return (
                '🚨 NEW CALL: {} has advanced to a runoff'
                ' in the {} primary for {}. {}'
            ).format(
                candidate,
                party_labels[party],
                office,
                page_url
            )
        else:
            return '🚨 NEW CALL: {} has won the {} primary for {}. {}'.format(
                candidate,
                party_labels[party],
                office,
                page_url
            )
    else:
        if runoff:
            return (
                '🚨 NEW CALL: {} has advanced to a runoff'
                ' in the race for {}. {}'
            ).format(
                candidate,
                office,
                page_url
            )
        else:
            return '🚨 NEW CALL: {} has won the race for {}. {}'.format(
                candidate,
                office,
                page_url
            )


@shared_task
def call_race_on_twitter(payload):
    payload = Namespace(**payload)
    api = twitter.Api(
        consumer_key=CONSUMER_KEY,
        consumer_secret=CONSUMER_SECRET,
        access_token_key=ACCESS_TOKEN_KEY,
        access_token_secret=ACCESS_TOKEN_SECRET
    )

    screenshot = get_screenshot(
        payload.division_slug,
        payload.race_id
    )

    status = construct_status(
        payload.primary_party,
        payload.candidate,
        payload.office,
        payload.runoff
    )

    api.PostUpdate(
        status=status,
        media=screenshot
    )
