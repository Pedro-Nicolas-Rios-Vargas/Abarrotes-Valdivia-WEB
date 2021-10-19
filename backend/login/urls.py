from django.urls import path
from .views import LoginValidationView

urlpatterns = [
    path('valid', LoginValidationView.as_view(), name="verification")
]
