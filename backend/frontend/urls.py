from django.urls import path
from .views import index

urlpatterns = [
    path('', index),
    path('cliente/add', index),
    path('cliente/consultar', index),
    path('cliente/modificar', index),
    path('cliente/eliminar', index),
    path('proveedor/agregar', index),
    path('proveedor/consultar', index),
    path('proveedor/modificar', index),
    path('proveedor/eliminar', index),
    path('producto/agregar', index),
    path('producto/consultar', index),
    path('producto/modificar', index),
    path('producto/eliminar', index),
    path('venta/agregar', index),
]
