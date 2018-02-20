"""
Base context for all pages, e.g., data needed to render navigation.
"""

from django.test.client import RequestFactory
from django.views.generic import DetailView, TemplateView

from .mixins.statics import StaticsMixin


class LinkPreview(TemplateView):
    template_name = "electionnight/preview.html"


class BaseView(DetailView, StaticsMixin):
    name = None
    path = ''
    publish_path = ''

    def get_publish_path(self, context):
        return self.publish_path.format(context)

    def get_request(self, path='', production=False):
        """Construct a request we can use to render the view."""
        if production:
            env = {'env': 'prod'}
        else:
            env = {'env': 'dev'}
        return RequestFactory().get(path, env)

    def get_context_data(self, **kwargs):
        context = super(BaseView, self).get_context_data(**kwargs)
        context['domain'] = 'www.politico.com/interactives'
        return context

    def get_context_paths(self, production=False):
        """Build paths to staticfiles and data."""
        return {
            **self.get_scripts_paths(production),
            **self.get_data_paths(production)
        }
