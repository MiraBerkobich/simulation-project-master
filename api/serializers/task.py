from rest_framework import serializers

from api.serializers.questions import QuestionSerializer
from scrum.models import Task


class TaskSerializer(serializers.HyperlinkedModelSerializer):
    questions = QuestionSerializer(many=True)
    class Meta:
        model = Task
        fields = ['id', 'name', 'description', 'project', 'questions']