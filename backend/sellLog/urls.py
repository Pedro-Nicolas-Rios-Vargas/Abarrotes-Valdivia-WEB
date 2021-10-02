from django.urls import path
from .views import SellLogView, CreateSellLogView, borrar, update, getLatest

urlpatterns = [
    path('get-sellLog', SellLogView.as_view()),
    path('add-sellLog', CreateSellLogView.as_view()),
    path('delete-sellLog/<int:pk>', borrar),
    path('update-sellLog/<int:pk>', update),
    path('get-last', getLatest),
    # path('get-all-id/<int:pk>', allId)
]