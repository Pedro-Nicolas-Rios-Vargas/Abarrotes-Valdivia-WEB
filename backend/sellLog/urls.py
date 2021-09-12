from django.urls import path
from .views import SellLogView, CreateSellLogView, borrar, update

urlpatterns = [
    path('get-sellLog', SellLogView.as_view()),
    path('add-sellLog', CreateSellLogView.as_view()),
    path('delete-sellLog/<int:pk>', borrar),
    path('update-sellLog/<int:pk>', update),
]