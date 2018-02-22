"""
State result pages.

URL PATTERNS:
/election-results/{YEAR}/{STATE}/
"""
from django.shortcuts import get_object_or_404
from geography.models import Division, DivisionLevel
from rest_framework.reverse import reverse

from electionnight.serializers import StateSerializer
from electionnight.utils.auth import secure

from .base import BaseView


@secure
class StatePage(BaseView):
    """
    **Preview URL**: :code:`/state/{YEAR}/{STATE}/{ELECTION_DATE}/`
    """
    name = 'electionnight_state-page'
    path = 'state/<int:year>/<slug:state>/<slug:election_date>/'

    js_dev_path = 'electionnight/js/app.js'
    css_dev_path = 'electionnight/css/app.css'

    model = Division
    context_object_name = 'state'
    template_name = 'electionnight/states/index.html'

    def get_queryset(self):
        level = DivisionLevel.objects.get(name=DivisionLevel.STATE)
        return self.model.objects.filter(level=level)

    def get_object(self, **kwargs):
        return get_object_or_404(Division, slug=self.kwargs.get('state'))

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)

        # Set kwargs to properties on class.
        self.year = self.kwargs.get('year')
        self.state = self.kwargs.get('state')
        self.election_date = self.kwargs.get('election_date')

        context['year'] = self.year
        context['state'] = self.state

        return {
            **context,
            **self.get_paths_context(production=context['production'])
        }

    def get_publish_path(self):
        return 'election-results/{}/{}/'.format(self.year, self.state)

    def get_serialized_context(self):
        """Get serialized context for baking to S3."""
        division = Division.objects.get(slug=self.state)
        return StateSerializer(division, context={
            'election_date': self.election_date
        }).data

    def get_extra_static_paths(self, production):
        if production:
            return {
                'context': 'context.json',
            }
        return {
            'context': reverse(
                'electionnight_api_state-election-detail',
                args=[self.election_date, self.object.pk],
                request=self.request
            ),
        }