from django.urls import path
from .views import get_user_cart, add_cart_item, update_cart_item_quantity
from rest_framework.urlpatterns import format_suffix_patterns

urlpatterns = format_suffix_patterns([
    path('cart/', get_user_cart, name='get-user-cart'),
    path('cart/items/', add_cart_item, name='add-cart-item'),
    path('cart/items/<int:item_id>/', update_cart_item_quantity,
         name='update_cart_item_quantity'),
], allowed=['json', 'html'])
