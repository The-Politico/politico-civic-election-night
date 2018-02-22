from election.models import ElectionDay
from geography.models import Division
from government.models import Party
from rest_framework import serializers
from rest_framework.reverse import reverse

from electionnight.models import PageContent

from .division import DivisionSerializer
from .election import ElectionSerializer
from .party import PartySerializer


class StateListSerializer(serializers.ModelSerializer):
    url = serializers.SerializerMethodField()

    def get_url(self, obj):
        return reverse(
            'electionnight_api_state-election-detail',
            request=self.context['request'],
            kwargs={
                'pk': obj.pk,
                'date': self.context['election_date']
            })

    class Meta:
        model = Division
        fields = (
            'url',
            'uid',
            'name',
        )


class StateSerializer(serializers.ModelSerializer):
    division = serializers.SerializerMethodField()
    parties = serializers.SerializerMethodField()
    elections = serializers.SerializerMethodField()
    content = serializers.SerializerMethodField()

    def get_division(self, obj):
        """Division."""
        return DivisionSerializer(obj).data

    def get_parties(self, obj):
        """All parties."""
        return PartySerializer(Party.objects.all(), many=True).data

    def get_elections(self, obj):
        """All elections in division."""
        election_day = ElectionDay.objects.get(
            date=self.context['election_date'])
        return ElectionSerializer(
            obj.elections.filter(election_day=election_day),
            many=True).data

    def get_content(self, obj):
        """All content for a state's page on an election day."""
        election_day = ElectionDay.objects.get(
            date=self.context['election_date'])
        return PageContent.objects.division_content(election_day, obj)

    class Meta:
        model = Division
        fields = (
            'uid',
            'content',
            'elections',
            'parties',
            'division',
        )