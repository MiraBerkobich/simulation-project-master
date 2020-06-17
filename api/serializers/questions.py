from rest_framework import serializers
from api.serializers.answers import AnswerSerializer
from scrum.models import Question, Task


class TaskSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Task
        fields = ['id', 'name', 'description']


class QuestionSerializer(serializers.ModelSerializer):
    answers = AnswerSerializer(many=True)
    task = TaskSerializer(required=False)

    class Meta:
        model = Question
        fields = ['id', 'desc', 'help', 'active', 'task', 'answers', 'team', 'client', 'complexity']
