from django.urls import path
from .views import ClienteView, CreateClienteView, otro, update, backUp, restore

urlpatterns = [
    path('get-client', ClienteView.as_view()),
    path('crear-cliente', CreateClienteView.as_view()),
    path('delete-cliente/<int:pk>', otro),
    path('update-cliente/<int:pk>', update),
    path('backUp', backUp),
    path('restore', restore),

]