from django.urls import path, include
from django.contrib import admin
from . import views
from .views import login

urlpatterns = [
    path('', views.ShoppingList.as_view()),
    path('<int:pk>/', views.DetailList.as_view()),
    path('login', login),
    path('rest-auth/', include('rest_auth.urls')),
]