from django.contrib import admin

from electionnight.models import APElectionMeta, PageContent, PageContentType
from .page_content import PageContentAdmin

admin.site.register(APElectionMeta)

admin.site.register(PageContent, PageContentAdmin)
admin.site.register(PageContentType)
