"""
Base context for all pages, e.g., data needed to render navigation.
"""

from core.aws import defaults
from django.views.generic import DetailView, TemplateView


class BaseView(DetailView):

    def get_context_data(self, **kwargs):
        context = super(BaseView, self).get_context_data(**kwargs)
        context['domain'] = defaults.DOMAIN
        context['root_path'] = defaults.ROOT_PATH
        # Context TK
        return context


class LinkPreview(TemplateView):
    template_name = "theshow/preview.html"
