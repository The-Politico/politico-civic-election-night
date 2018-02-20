"""
State result pages.

URL PATTERNS:
/election-results/{YEAR}/{STATE}/

State results for federal branch, ie, congress and the presidency.

URL PATTERNS:
/election-results/{BRANCH}/{STATE}/

* Branch is either the Body of congress or the Office of the presidency
"""
from django.shortcuts import get_object_or_404
from geography.models import Division, DivisionLevel

from electionnight.serializers import StateSerializer

from .base import BaseView

# from government.models import Body, Jurisdiction, Office


class StatePage(BaseView):
    """
    **Preview URL**: :code:`/election-results/state/{YEAR}/{STATE}/`
    """
    name = 'electionnight_state-page'
    path = 'state/<int:year>/<slug:state>/'

    js_dev_path = 'electionnight/js/app.js'
    css_dev_path = 'electionnight/css/app.css'

    model = Division
    context_object_name = 'state'
    template_name = 'electionnight/states/state.live.html'

    def get_publish_path(self, year, state):
        return 'election-results/{}/{}/'.format(year, state)

    def get_serialized_context(self, division):
        division = Division.objects.get(slug=self.state)
        return StateSerializer(division, context={
            'election_date': self.election_date
        }).data

    def get_queryset(self):
        level = DivisionLevel.objects.get(name=DivisionLevel.STATE)
        return self.model.objects.filter(level=level)

    def get_object(self, **kwargs):
        return get_object_or_404(Division, slug=self.kwargs.get('state'))

    def get_context_data(self, **kwargs):
        production = self.request.GET.get('env', 'dev') == 'prod'
        context = super(StatePage, self).get_context_data(**kwargs)
        context['year'] = self.kwargs.get('year')
        return {
            **context,
            **self.get_context_paths(production)
        }

    def get_data_paths(self, production):
        if production:
            return {
                'geo': '',
                'last_updated': '',
                'results': ''
            }
        return {
            'geo': '',
            'last_updated': '',
            'results': ''
        }
