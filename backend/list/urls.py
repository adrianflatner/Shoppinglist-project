from django.urls import path, include
from django.contrib import admin
from . import views
from .views import login, sample_api, create_auth

# what you can put after api/ - example api/login or api/sampleapi
urlpatterns = [
    path('', views.ShoppingList.as_view()),
    path('<int:pk>/', views.DetailList.as_view()),
    path('login', login),
    path('sampleapi', sample_api),
    path('register', create_auth)
]
