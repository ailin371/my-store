from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ProductViewSet, ReviewViewSet

# router = DefaultRouter()
# router.register(r'products', ProductViewSet)
# router.register(r'reviews', ReviewViewSet)

# urlpatterns = [
#     path('', include(router.urls)),
# ]

# Product routes
product_list = ProductViewSet.as_view({
    'get': 'list',
})

product_detail = ProductViewSet.as_view({
    'get': 'retrieve',
})

# Review routes
review_list = ReviewViewSet.as_view({
    'get': 'list',
    'post': 'create',
})

review_detail = ReviewViewSet.as_view({
    'get': 'retrieve',
    'put': 'update',
    'delete': 'destroy',
})

urlpatterns = [
    path('products/', product_list, name='product-list'),
    path('products/<int:pk>/', product_detail, name='product-detail'),
    path('products/<int:productId>/reviews/', review_list, name='review-list'),
    path('products/<int:productId>/reviews/<int:pk>/',
         review_detail, name='review-detail'),
]
