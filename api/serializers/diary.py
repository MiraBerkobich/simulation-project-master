from rest_framework import serializers

from api.serializers.user import UserSerializer
from scrum.models import Diary


class DiarySerializer(serializers.HyperlinkedModelSerializer):
    user = UserSerializer(required=False)

    class Meta:
        model = Diary
        fields = ['user', 'time', 'task', 'question', 'answer', 'right_answer', 'comment']

