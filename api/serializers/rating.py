from rest_framework import serializers

from api.serializers.project import ProjectSerializer
from api.serializers.user import UserSerializer
from scrum.models import Rating


class RatingSerializer(serializers.HyperlinkedModelSerializer):
    user = UserSerializer(required=False)
    project = ProjectSerializer(required=False)

    class Meta:
        model = Rating
        fields = ['user', 'project', 'rating']