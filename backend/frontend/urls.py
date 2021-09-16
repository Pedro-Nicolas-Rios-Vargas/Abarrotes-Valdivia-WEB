from django.urls import path
from .views import index

urlpatterns = [
    path('', index),
    path('cliente/add', index),
    path('cliente/consultar', index),
    path('cliente/modificar', index),
    path('cliente/eliminar', index),
]
