from django.contrib.auth import logout
from rest_framework import status, views
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import UserLoginSerializer, UserRegistrationSerializer, UserSerializer


class RegisterUserView(APIView):
    def post(self, request):
        serializer = UserRegistrationSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            return Response({"status": "success", "data": serializer.data}, status=status.HTTP_201_CREATED)
        return Response({"status": "error", "data": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)


class LoginAPIView(views.APIView):
    def post(self, request):
        serializer = UserLoginSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data
        # serializing user instance
        data = UserSerializer(user).data
        return Response(data, status=status.HTTP_200_OK)


class LogoutAPIView(APIView):
    def post(self, request):
        logout(request)
        return Response(status=status.HTTP_204_NO_CONTENT)
