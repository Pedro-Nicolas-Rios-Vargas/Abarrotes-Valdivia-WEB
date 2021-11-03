from django.urls import path
from .views import ServerSocketView

urlpatterns = [
            path('barcode-request', ServerSocketView.as_view(), name="initServerSocket")
        ]
