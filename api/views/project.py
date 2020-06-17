from rest_framework import viewsets

from api.serializers.project import ProjectSerializer
from scrum.models import Project


class ProjectViewSet(viewsets.ModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer