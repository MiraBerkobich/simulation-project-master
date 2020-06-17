from django.urls import path, include
from rest_framework import routers
from rest_framework_jwt.views import obtain_jwt_token, refresh_jwt_token

from api.views.diary import DiaryListAPIView
from api.views.project import ProjectViewSet
from api.views.questions import QuestionListAPIView
from api.views.rating import RatingListAPIView
from api.views.task import TaskListAPIView
from api.views.user import CreateUserView

router = routers.DefaultRouter()
router.register(r'projects', ProjectViewSet)

urlpatterns = [
    path(r'api-token-auth/', obtain_jwt_token),
    path(r'api-token-refresh/', refresh_jwt_token),
    path(r'reg/', CreateUserView.as_view()),
    path(r'tasks/<project_id>/', TaskListAPIView.as_view()),
    path(r'rating/<project_id>/', RatingListAPIView.as_view()),
    path(r'diary_user/<user_id>/', DiaryListAPIView.as_view()),
    path(r'questions/', QuestionListAPIView.as_view()),
    path(r'', include(router.urls)),
]