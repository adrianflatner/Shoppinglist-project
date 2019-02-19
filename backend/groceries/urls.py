from django.urls import path

from . import views



urlpatterns = [
    path('', views.ListGrocery.as_view()),
    path('<int:pk>/', views.DetailGrocery.as_view()),
    
]