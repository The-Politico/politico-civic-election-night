from django.contrib import admin

from electionnight.models import (APElectionMeta, PageContent, PageContentType,
                                PageType, CandidateColorOrder)
from vote.models import Votes

from .page_content import PageContentAdmin
from .color_order import CandidateColorOrderAdmin
from .votes import VotesAdmin

admin.site.register(APElectionMeta)

admin.site.register(PageContent, PageContentAdmin)
admin.site.register(PageContentType)
admin.site.register(PageType)
admin.site.register(CandidateColorOrder, CandidateColorOrderAdmin)
admin.site.unregister(Votes)
admin.site.register(Votes, VotesAdmin)