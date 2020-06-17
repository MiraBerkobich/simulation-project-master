from rest_framework import serializers

from scrum.models import Answer


class AnswerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Answer
        fields = ['text', 'correct', 'question', 'deadlines', 'budget', 'customer', 'team', 'quality']