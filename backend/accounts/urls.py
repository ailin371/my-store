from django.urls import path
from .views import LoginAPIView, LogoutAPIView, PurchaseHistoryView, RegisterUserView, user_purchased_product

urlpatterns = [
    path('register/', RegisterUserView.as_view(), name='register'),
    path('login/', LoginAPIView.as_view(), name='login'),
    path('logout/', LogoutAPIView.as_view(), name='logout'),
    path('user/purchased/<int:product_id>/',
         user_purchased_product, name='user-purchased-product'),
    path('user/purchases/', PurchaseHistoryView.as_view(), name='purchase-history'),
]
