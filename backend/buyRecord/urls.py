from django.urls import path
from .views import BuyRecordView, CreateBuyRecordView, borrar, update

urlpatterns = [
    path('get-buyRecord', BuyRecordView.as_view()),
    path('add-buyRecord', CreateBuyRecordView.as_view()),
    path('delete-buyRecord/<int:pk>', borrar),
    path('update-buyRecord/<int:pk>', update)
]