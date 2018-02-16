from geography.models import Division
from rest_framework import serializers
from rest_framework.reverse import reverse

from .division import DivisionSerializer


class BodyListSerializer(serializers.ModelSerializer):
    url = serializers.SerializerMethodField()

    def get_url(self, obj):
        return reverse(
            'body-election-detail',
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


class BodySerializer(serializers.ModelSerializer):
    division = serializers.SerializerMethodField()
    parties = serializers.SerializerMethodField()
    elections = serializers.SerializerMethodField()
    content = serializers.SerializerMethodField()

    def get_division(self, obj):
        """Division."""
        return DivisionSerializer(obj.jurisdiction.division).data

    def get_parties(self, obj):
        """All parties."""
        return PartySerializer(Party.objects.all(), many=True).data

    def get_elections(self, obj):
        """All elections held on an election day."""
        election_day = ElectionDay.objects.get(
            date=self.context['election_date'])
        elections = Election.objects.filter(
            race__office__body=obj,
            race__special=False,
            election_day=election_day
        )
        return ElectionSerializer(elections, many=True).data

    def get_content(self, obj):
        """All content for body's page on an election day."""
        election_day = ElectionDay.objects.get(
            date=self.context['election_date'])
        return PageContent.objects.body_content(election_day, obj)

    class Meta:
        model = Body
        fields = (
            'uid',
            'content',
            'elections',
            'parties',
            'division',
        )
