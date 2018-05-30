import io
from argparse import Namespace
from urllib.parse import urlencode

import requests

import tweepy
from celery import shared_task
from django.conf import settings
from electionnight.conf import app_settings

CONSUMER_KEY = getattr(settings, 'CIVIC_TWITTER_CONSUMER_KEY', None)
CONSUMER_SECRET = getattr(settings, 'CIVIC_TWITTER_CONSUMER_SECRET', None)
ACCESS_TOKEN_KEY = getattr(settings, 'CIVIC_TWITTER_ACCESS_TOKEN_KEY', None)
ACCESS_TOKEN_SECRET = getattr(
    settings, 'CIVIC_TWITTER_ACCESS_TOKEN_SECRET', None)


def get_screenshot(division_slug, race_id):
    if app_settings.AWS_S3_BUCKET == 'interactives.politico.com':
        start_path = '/election-results'
    else:
        start_path = '/staging.interactives.politico.com/election-results'
    query = urlencode({
        'path': '{}/2018/{}/'.format(
            start_path,
            division_slug
        ),
        'selector': '.race-table-{}'.format(
            race_id
        ),
        'padding': 5
    })
    root = 'http://politico-botshot.herokuapp.com/shoot/?'

    response = requests.get(
        '{}{}'.format(root, query)
    )
    return io.BytesIO(response.content)


def construct_status(
    party, candidate, office, runoff, division_slug, jungle, runoff_election
):
    party_labels = {
        'Democrat': 'Democratic',
        'Republican': 'Republican'
    }
    page_url = (
        'https://www.politico.com/election-results/2018'
        '/{}/'.format(division_slug)
    )
    if runoff_election:
        page_url += 'runoff'
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
    elif jungle:
        return (
                '🚨 NEW CALL: {} has advanced to the general election'
                ' in the open primary for {}. {}'
            ).format(
                candidate,
                office,
                page_url
            )
    elif runoff_election:
        if party:
            return (
                '🚨 NEW CALL: {} has won the {}'
                ' primary runoff for {}. {}'
                ).format(
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
    auth = tweepy.OAuthHandler(CONSUMER_KEY, CONSUMER_SECRET)
    auth.set_access_token(ACCESS_TOKEN_KEY, ACCESS_TOKEN_SECRET)
    api = tweepy.API(auth)

    screenshot = get_screenshot(
        payload.division_slug,
        payload.race_id
    )

    status = construct_status(
        payload.primary_party,
        payload.candidate,
        payload.office,
        payload.runoff,
        payload.jungle,
        payload.runoff_election
    )

    api.update_with_media(
        filename='result.png',
        status=status,
        file=screenshot
    )
