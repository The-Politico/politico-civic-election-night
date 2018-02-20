import os
import uuid

from django.conf import settings as project_settings
from rest_framework.renderers import JSONRenderer


class StaticsMixin(object):
    """
    Adds handling for static files.
    """
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.hash = uuid.uuid4().hex[:10]

        self.js_dev_path = None
        self.js_prod_path = 'script-{}.js'.format(self.hash)

        self.css_dev_path = None
        self.css_prod_path = 'styles-{}.css'.format(self.hash)

    def get_scripts_paths(self, production=False):
        if production:
            return {
                'js': self.js_prod_path,
                'css': self.css_prod_path
            }
        return {
            'js': self.js_dev_path,
            'css': self.css_dev_path
        }

    def get_data_paths(self, production=False):
        return {}

    @staticmethod
    def render_static_string(static):
        """Must have run collectstatic first."""
        path = os.path.join(
            project_settings.STATIC_ROOT,
            static
        )
        with open(path, 'rb') as staticfile:
            return staticfile.read()

    def publish_js(self):
        # TODO
        pass

    def publish_css(self):
        # TODO
        pass

    def publish_serialized_context(self):
        # TODO
        data = self.get_serialized_context()
        json = JSONRenderer().render(data)
        pass

    def publish_statics(self):
        # TODO
        pass
