from django.urls import path
from .views import MovementSerializer, CreateMovementView, MovementView

urlpatterns = [
    path('get-movement', MovementView.as_view()), 
    path('add-movement', CreateMovementView.as_view()),
]