from rest_framework import viewsets
from django.db.models import Count
from rest_framework.generics import ListAPIView

from api.serializers.task import TaskSerializer
from scrum.models import Task


class TaskListAPIView(ListAPIView):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer

    def get(self, request, *args, **kwargs):
        self.queryset = Task.objects.annotate(questions_count=Count('questions')).filter(
            project__id=kwargs.get('project_id'), questions_count__gt=0)
        return self.list(request, *args, **kwargs)
