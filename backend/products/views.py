from django.shortcuts import render
from rest_framework import viewsets, mixins, permissions
from django.db.models import Q
from products.permissions import IsReviewOwner
from .models import Product, Review
from .serializers import ProductSerializer, ReviewSerializer


class ProductViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

    def get_queryset(self):
        queryset = Product.objects.all()
        category = self.request.query_params.get('category', None)

        if category is not None:
            # __iexact means to ignore letter casing (upper/lower cases)
            queryset = queryset.filter(Q(category__iexact=category))

        return queryset


class ReviewViewSet(mixins.CreateModelMixin,
                    mixins.RetrieveModelMixin,
                    mixins.UpdateModelMixin,
                    mixins.DestroyModelMixin,
                    mixins.ListModelMixin,
                    viewsets.GenericViewSet):
    queryset = Review.objects.all()
    serializer_class = ReviewSerializer
    permission_classes = [permissions.IsAuthenticated, IsReviewOwner]

    def perform_create(self, serializer):
        # Get product from the productId in the URL
        product = Product.objects.get(pk=self.kwargs['productId'])
        serializer.save(user=self.request.user, product=product)

    def get_queryset(self):
        # Filter reviews based on productId from the URL
        return self.queryset.filter(product_id=self.kwargs['productId'])
