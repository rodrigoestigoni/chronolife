from rest_framework import generics, permissions
from .models import User
from .serializers import UserSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status

class UserCreateView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.AllowAny]


class UserMeView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        return Response({'username': user.username, 'email': user.email})

    def put(self, request):
        user = request.user
        username = request.data.get('username', user.username)
        email = request.data.get('email', user.email)
        user.username = username
        user.email = email
        user.save()
        return Response({'username': user.username, 'email': user.email}, status=status.HTTP_200_OK)
