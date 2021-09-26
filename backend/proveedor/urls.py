from django.urls import path
from .views import CreateProveedorView, ProveedorView, borracion, update

urlpatterns = [
    path('get-proveedor', ProveedorView.as_view()),
    path('add-proveedor', CreateProveedorView.as_view()),
    path('update-proveedor/<int:pk>', update),
    path('delete-proveedor/<int:pk>', borracion),
]
