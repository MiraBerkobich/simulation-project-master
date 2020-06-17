from rest_framework import viewsets
from rest_framework.generics import ListAPIView, ListCreateAPIView

from api.serializers.diary import DiarySerializer
from scrum.models import Diary


class DiaryListAPIView(ListCreateAPIView):
    queryset = Diary.objects.all()
    serializer_class = DiarySerializer

    def get(self, request, *args, **kwargs):
        self.queryset = Diary.objects.filter(user__id=kwargs.get('user_id'))[:200]
        return self.list(request, *args, **kwargs)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)