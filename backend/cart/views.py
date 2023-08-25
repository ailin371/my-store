from accounts.models import Purchase, PurchaseItem
from .models import Cart, CartItem, Product
from .serializers import CartSerializer, CartItemSerializer
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status


@api_view(['GET'])
def get_user_cart(request):
    if request.user.is_authenticated:
        try:
            cart = Cart.objects.get(user=request.user.id)
        except Cart.DoesNotExist:
            return Response({"error": "Cart does not exist for this user."}, status=status.HTTP_400_BAD_REQUEST)

        serializer = CartSerializer(cart)
        return Response(serializer.data)
    return Response({'detail': 'Authentication credentials were not provided.'}, status=status.HTTP_401_UNAUTHORIZED)


@api_view(['POST'])
def add_cart_item(request):
    if request.user.is_authenticated:
        product = request.data.get('product')
        productId = product.get('id')
        quantity = request.data.get('quantity', 1)
        product = Product.objects.get(pk=productId)
        cart, _ = Cart.objects.get_or_create(user=request.user)
        cart_item, created = CartItem.objects.get_or_create(
            cartId=cart, product=product)
        if created:
            cart_item.quantity = quantity
        else:
            cart_item.quantity += quantity
        cart_item.save()
        serializer = CartItemSerializer(cart_item)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response({'detail': 'Authentication credentials were not provided.'}, status=status.HTTP_401_UNAUTHORIZED)


@api_view(['DELETE'])
def delete_cart_item(request, item_id):
    if request.user.is_authenticated:
        try:
            cart_item = CartItem.objects.get(
                pk=item_id, cartId__user=request.user)
            cart_item.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except CartItem.DoesNotExist:
            return Response({'detail': 'Item not found.'}, status=status.HTTP_404_NOT_FOUND)
    return Response({'detail': 'Authentication credentials were not provided.'}, status=status.HTTP_401_UNAUTHORIZED)


@api_view(['PATCH', 'DELETE'])
def update_cart_item_quantity(request, item_id):
    if request.user.is_authenticated:
        try:
            cart_item = CartItem.objects.get(
                pk=item_id, cartId__user=request.user)
            if request.method == 'PATCH':
                new_quantity = request.data.get('quantity')
                if new_quantity is not None and new_quantity > 0:
                    cart_item.quantity = new_quantity
                    cart_item.save()
                    serializer = CartItemSerializer(cart_item)
                    return Response(serializer.data)
                else:
                    return Response({'detail': 'Invalid quantity.'}, status=status.HTTP_400_BAD_REQUEST)

            elif request.method == 'DELETE':
                cart_item.delete()
                return Response(status=status.HTTP_204_NO_CONTENT)

        except CartItem.DoesNotExist:
            return Response({'detail': 'Item not found.'}, status=status.HTTP_404_NOT_FOUND)

    return Response({'detail': 'Authentication credentials were not provided.'}, status=status.HTTP_401_UNAUTHORIZED)


@api_view(['POST'])
def checkout(request):
    if request.user.is_authenticated:
        try:
            cart = Cart.objects.get(user=request.user)
            purchase = Purchase.objects.create(
                user=request.user, totalCost=cart.totalPrice)

            for item in cart.items.all():
                PurchaseItem.objects.create(
                    purchase=purchase, product=item.product, quantity=item.quantity, priceAtPurchase=item.product.price)

            cart.items.clear()

            return Response({"status": "Purchase successful"}, status=status.HTTP_200_OK)
        except Cart.DoesNotExist:
            return Response({"detail": "Your cart is empty."}, status=status.HTTP_400_BAD_REQUEST)
    return Response({'detail': 'Authentication credentials were not provided.'}, status=status.HTTP_401_UNAUTHORIZED)
