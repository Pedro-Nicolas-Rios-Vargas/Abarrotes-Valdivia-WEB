from django.urls import path
from .views import SellRecordView, CreateSellRecordView, borrar, update

urlpatterns = [
    path('get-sellRecord', SellRecordView.as_view()),
    path('add-sellRecord', CreateSellRecordView.as_view()),
    path('delete-sellRecord/<int:pk>', borrar),
    path('update-sellRecord/<int:pk>', update),
]