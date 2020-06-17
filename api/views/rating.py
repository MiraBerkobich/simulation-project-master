from rest_framework.generics import ListCreateAPIView

from api.serializers.rating import RatingSerializer
from scrum.models import Rating, Project


class RatingListAPIView(ListCreateAPIView):
    queryset = Rating.objects.all()
    serializer_class = RatingSerializer

    def get(self, request, *args, **kwargs):
        self.queryset = Rating.objects.filter(project__id=kwargs.get('project_id'))
        return self.list(request, *args, **kwargs)

    def perform_create(self, serializer):
        project = Project.objects.get(id=self.kwargs.get('project_id'))
        serializer.save(user=self.request.user, project=project)