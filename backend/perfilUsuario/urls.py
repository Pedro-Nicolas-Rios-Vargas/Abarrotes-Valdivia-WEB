from django.urls import path
from .views import ChangingUserInfo, RecoveringUserInfo, ValidatingPassword

urlpatterns = [
    path('changing-userinfo', ChangingUserInfo.as_view()),
    path('recover-userinfo', RecoveringUserInfo.as_view()),
    path('verifying-password', ValidatingPassword.as_view()),
]
