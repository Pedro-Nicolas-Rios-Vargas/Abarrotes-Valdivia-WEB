from rest_framework.views import APIView
from rest_framework import status
from rest_framework.response import Response
from .serializers import UserSerializer
from userManager import UserData


# Create your views here.
class RecoveringUserInfo(APIView):
    def __init__(self):
        self.user = UserData()
        self.user_data = self.user.user_data

    def post(self, request, format=None):
        return Response(
                {
                    'username': self.user_data['username'],
                    'password': self.user_data['password'],
                    'email': self.user_data['email'],
                },
                status=status.HTTP_200_OK
                )


class ChangingUserInfo(APIView):
    serializer_class = UserSerializer

    def __init__(self):
        self.user = UserData()
        self.user_data = self.user.user_data

    def post(self, request, format=None):
        dataEntry = self.serializer_class(data=request.data)
        if dataEntry.is_valid():
            usernameEntry = dataEntry.data.get('username')
            passwordEntry = dataEntry.data.get('pwd')
            emailEntry = dataEntry.data.get('email')
            self.user.changeUserInfo(usernameEntry,
                                     passwordEntry,
                                     emailEntry)
            return Response(
                    {'Mensaje': 'Cambios recibidos'},
                    status=status.HTTP_200_OK
                    )
        else:
            return Response(
                    {'Mensaje': 'Datos no validos'},
                    status=status.HTTP_406_NOT_ACCEPTABLE
                    )
