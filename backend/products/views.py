from django.shortcuts import render
from rest_framework import viewsets
from django.db.models import Q
from .models import Product
from .serializers import ProductSerializer


class ProductViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

    def get_queryset(self):
        queryset = Product.objects.all()
        category = self.request.query_params.get('category', None)

        if category is not None:
            queryset = queryset.filter(Q(category__iexact=category)) # __iexact means to ignore letter casing (upper/lower cases)

        return queryset
