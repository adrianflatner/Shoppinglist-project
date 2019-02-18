# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.shortcuts import render
from rest_framework import generics, viewsets
from .models import List 
from .serializers import ListSerializer

class ShoppingList(generics.ListCreateAPIView):
    serializer_class = ListSerializer
    queryset = List.objects.all()

class DetailList(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = ListSerializer
    queryset = List.objects.all()


# Create your views here.
