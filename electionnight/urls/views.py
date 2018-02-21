from django.urls import path

from electionnight.views import DevHome, StatePage

urlpatterns = [
    path('', DevHome.as_view(), name='preview'),
    path(StatePage.path, StatePage.as_view(), name=StatePage.name)
]
