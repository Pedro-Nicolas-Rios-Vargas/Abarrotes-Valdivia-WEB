from django.urls import path
from .views import LogoutView

urlpatterns = [
            path('', LogoutView.as_view(), name="salida")
]
