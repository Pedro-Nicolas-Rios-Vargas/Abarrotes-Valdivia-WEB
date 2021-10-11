from django.urls import path
from .views import index

urlpatterns = [
    path('home/cliente/add', index),
    path('home/cliente/consultar', index),
    path('home/cliente/modificar', index),
    path('home/cliente/eliminar', index),
    path('home/proveedor/agregar', index),
    path('home/proveedor/consultar', index),
    path('home/proveedor/modificar', index),
    path('home/proveedor/eliminar', index),
    path('home/producto/agregar', index),
    path('home/producto/consultar', index),
    path('home/producto/modificar', index),
    path('home/producto/eliminar', index),
    path('home/venta/agregar', index),
    path('home/venta/consultar', index),
    path('home/compras/agregar', index),
    path('home/compras/consultar', index),
    path('', index),
    path('home/', index)
]
