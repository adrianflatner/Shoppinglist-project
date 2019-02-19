from django.shortcuts import render

from rest_framework import generics


from .models import Grocery
from .serializers import GrocerySerializer


class ListGrocery(generics.ListCreateAPIView):
    queryset = Grocery.objects.all()
    serializer_class = GrocerySerializer

class DetailGrocery(generics.RetrieveUpdateDestroyAPIView):
    queryset = Grocery.objects.all()
    serializer_class = GrocerySerializer

