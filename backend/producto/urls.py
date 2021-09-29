from django.urls import path
from .views import CreateProductoeView, ProductoView, getProducto, otro, update

urlpatterns = [
    path('get-producto', ProductoView.as_view()),
    path('add-producto', CreateProductoeView.as_view()),
    path('update-producto/<int:pk>', update),
    path('delete-producto/<int:pk>', otro),
    path('get-producto/<int:pk>', getProducto),
]