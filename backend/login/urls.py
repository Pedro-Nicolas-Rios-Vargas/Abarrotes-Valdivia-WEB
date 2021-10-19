from django.urls import path
from .views import loginValidationView

urlpatterns = [
    path('valid', loginValidationView.as_view(), name="verification")
]
