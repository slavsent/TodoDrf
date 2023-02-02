from django.urls import path
from .views import UserListAPIView


app_name = 'mainapp'
urlpatterns = [
    path('', UserListAPIView.as_view()),
]
