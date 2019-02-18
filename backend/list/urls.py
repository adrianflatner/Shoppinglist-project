from django.urls import path, include

from . import views

urlpatterns = [
    path('', views.ShoppingList.as_view()),
    path('<int:pk>/', views.DetailList.as_view()),
    path('rest-auth/', include('rest_auth.urls')),
]