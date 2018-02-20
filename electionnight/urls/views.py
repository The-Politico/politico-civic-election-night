from django.urls import path

from electionnight.views import LinkPreview, StatePage

urlpatterns = [
    path(
        '',
        LinkPreview.as_view(),
        name='preview'
    ),
    path(StatePage.path, StatePage.as_view(), name=StatePage.name)
    # url(
    #     r'^cycle/(?P<year>\d{4})/$',
    #     CyclePage.as_view(),
    #     name='cycle-page'
    # ),
    # url(
    #     r'^cycle/(?P<year>\d{4})/export/$',
    #     CyclePageExport.as_view(),
    #     name='cycle-page-export'
    # ),
    # url(
    #     r'^state/(?P<year>\d{4})/(?P<state>[\w-]+)/$',
    #     StatePage.as_view(),
    #     name='state-page'
    # ),
    # url(
    #     r'^state/(?P<year>\d{4})/(?P<state>[\w-]+)/export/$',
    #     StatePageExport.as_view(),
    #     name='state-page-export'
    # ),
    # url(
    #     r'^special/(?P<year>\d{4})/(?P<state>[\w-]+)/special-election/'
    #     r'(?P<month>\w{3})-(?P<day>\d{2})/$',
    #     SpecialElectionPage.as_view(),
    #     name='special-election-page'
    # ),
    # url(
    #     r'^special/(?P<year>\d{4})/(?P<state>[\w-]+)/special-election/'
    #     r'(?P<month>\w{3})-(?P<day>\d{2})/export/$',
    #     SpecialElectionPageExport.as_view(),
    #     name='special-election-page-export'
    # ),
    # url(
    #     r'^state/(?P<year>\d{4})/(?P<state>[\w-]+)/export/$',
    #     StatePageExport.as_view(),
    #     name='state-page-export'
    # ),
    # url(
    #     r'^state/(?P<year>\d{4})/(?P<branch>[\w-]+)/(?P<state>[\w-]+)/$',
    #     StateFedPage.as_view(),
    #     name='state-fed-page'
    # ),
    # url(
    #     r'^state/(?P<year>\d{4})/(?P<branch>[\w-]+)/'
    #     r'(?P<state>[\w-]+)/export/$',
    #     StateFedPageExport.as_view(),
    #     name='state-fed-page-export'
    # ),
    # url(
    #     r'^body/(?P<year>\d{4})/(?P<body>[\w-]+)/$',
    #     FederalBodyPage.as_view(),
    #     name='fed-body-page'
    # ),
    # url(
    #     r'^body/(?P<year>\d{4})/(?P<body>[\w-]+)/export/$',
    #     FederalBodyPageExport.as_view(),
    #     name='fed-body-page-export'
    # ),
    # url(
    #     r'^body/(?P<year>\d{4})/(?P<state>[\w-]+)/(?P<body>[\w-]+)/$',
    #     StateBodyPage.as_view(),
    #     name='state-body-page'
    # ),
    # url(
    #     r'^body/(?P<year>\d{4})/(?P<state>[\w-]+)/(?P<body>[\w-]+)/export/$',
    #     StateBodyPageExport.as_view(),
    #     name='state-body-page-export'
    # ),
    # url(
    #     r'^race/(?P<year>\d{4})/(?P<office>[\w-]+)/$',
    #     FederalExecutiveRacePage.as_view(),
    #     name='fed-exec-race-page'
    # ),
    # url(
    #     r'^race/(?P<year>\d{4})/(?P<office>[\w-]+)/export/$',
    #     FederalExecutiveRacePageExport.as_view(),
    #     name='fed-exec-race-page-export'
    # ),
    # url(
    #     r'^race/(?P<year>\d{4})/(?P<state>[\w-]+)/(?P<office>[\w-]+)'
    #     r'/(?P<date>\d{4}-\d{2}-\d{2})/$',
    #     StateExecutiveRacePage.as_view(),
    #     name='state-exec-race-page'
    # ),
    # url(
    #     r'^race/(?P<year>\d{4})/(?P<state>[\w-]+)/(?P<office>[\w-]+)'
    #     r'/(?P<date>\d{4}-\d{2}-\d{2})/export/',
    #     StateExecutiveRacePageExport.as_view(),
    #     name='state-exec-race-page-export'
    # ),
]
