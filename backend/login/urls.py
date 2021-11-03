from django.urls import path
from .views import LoginValidationView, RecoveringAccess

urlpatterns = [
    path('valid', LoginValidationView.as_view(), name="verification"),
    path('recover-pass', RecoveringAccess.as_view(), name="recovering-pass")
]
