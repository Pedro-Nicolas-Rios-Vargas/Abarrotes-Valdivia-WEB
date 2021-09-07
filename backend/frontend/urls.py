from django.urls import path
from .views import index

urlpatterns = [
    path('', index),
    path('Add', index),
    path('Modi', index),
    path('consult', index)
]
