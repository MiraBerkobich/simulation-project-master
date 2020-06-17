from rest_framework import serializers

from scrum.models import Project, Task, Question


class ProjectSerializer(serializers.HyperlinkedModelSerializer):
    tasks_count = serializers.SerializerMethodField()

    class Meta:
        model = Project
        fields = ['id', 'name', 'description', 'tasks_count']

    def get_tasks_count(self, obj):
        tasks_ids = Task.objects.filter(project=obj).values_list('id', flat=True)
        return Question.objects.filter(task__id__in=tasks_ids).count()
