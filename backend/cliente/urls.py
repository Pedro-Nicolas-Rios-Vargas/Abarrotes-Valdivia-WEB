from django.urls import path
from .views import ClienteView

urlpatterns = [
    path('cliente', ClienteView.as_view()),
]