from rest_framework import parsers
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth import logout
from rest_framework import status, views
from rest_framework.response import Response
from rest_framework.views import APIView
from accounts.models import Purchase, PurchaseItem
from .serializers import PurchaseSerializer, UserLoginSerializer, UserRegistrationSerializer, UserSerializer
from rest_framework.authtoken.models import Token
from rest_framework.decorators import api_view


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
        token, created = Token.objects.get_or_create(user=user)
        data = UserSerializer(user).data
        data['token'] = token.key
        return Response(data, status=status.HTTP_200_OK)


class LogoutAPIView(APIView):
    def post(self, request):
        if request.user.is_authenticated:
            # Get the token for the user and delete it
            try:
                token = Token.objects.get(user=request.user)
                token.delete()
            except Token.DoesNotExist:
                pass

        # Use Django's built-in logout
        logout(request)
        return Response(status=status.HTTP_204_NO_CONTENT)


@api_view(['GET'])
def user_purchased_product(request, product_id):
    if request.user.is_authenticated:
        purchased = PurchaseItem.objects.filter(
            purchase__user=request.user, product_id=product_id).exists()

        return Response({'purchased': purchased}, status=status.HTTP_200_OK)

    return Response({'detail': 'Authentication credentials were not provided.'}, status=status.HTTP_401_UNAUTHORIZED)


class PurchaseHistoryView(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request):
        purchases = Purchase.objects.filter(user=request.user)
        serializer = PurchaseSerializer(purchases, many=True)
        return Response(serializer.data)


class UpdateProfilePicture(APIView):
    parser_classes = [parsers.MultiPartParser]

    def put(self, request):
        user = request.user
        serializer = UserSerializer(user, data=request.data, partial=True)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
