from __future__ import unicode_literals
from django.shortcuts import render
from rest_framework import generics, viewsets
from .models import Userprofile
from .serializers import UserprofileSerializer


class Userprofiles(generics.ListCreateAPIView):
    serializer_class = UserprofileSerializer
    queryset = Userprofile.objects.all()


class Details(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = UserprofileSerializer
    queryset = Userprofile.objects.all()