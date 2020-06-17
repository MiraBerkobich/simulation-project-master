from django.contrib.auth import get_user_model
from rest_framework import status, permissions
from rest_framework.generics import CreateAPIView


from api.serializers.user import UserSerializer

User = get_user_model()


class CreateUserView(CreateAPIView):
    model = get_user_model()
    permission_classes = [
        permissions.AllowAny  # Or anon users can't register
    ]
    serializer_class = UserSerializer
