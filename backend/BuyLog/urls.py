from django.urls import path
from .views import BuyLogView, CreateBuyLogView, borrar, update, getLatest

urlpatterns = [
    path('get-buyLog', BuyLogView.as_view()),
    path('add-buyLog', CreateBuyLogView.as_view()),
    path('delete-buyLog/<int:pk>', borrar),
    path('update-buyLog/<int:pk>', update),
    path('get-last', getLatest),
]