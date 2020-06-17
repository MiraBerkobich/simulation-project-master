from rest_framework import viewsets
from rest_framework.generics import ListAPIView

from api.serializers.questions import QuestionSerializer
from scrum.models import Question


class QuestionListAPIView(ListAPIView):
    queryset = Question.objects.all()[:100]
    serializer_class = QuestionSerializer

    def get(self, request, *args, **kwargs):
        if 'tasks' in request.GET:
            self.queryset = Question.objects.filter(task__id__in=request.GET.get('tasks').split(','),
                                                    client=False, team=False)
        elif 'team' in request.GET:
            self.queryset = Question.objects.filter(team=True)
        elif 'client' in request.GET:
            self.queryset = Question.objects.filter(client=True)
        return self.list(request, *args, **kwargs)
