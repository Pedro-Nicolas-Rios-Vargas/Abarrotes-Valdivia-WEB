from rest_framework.views import APIView
from rest_framework import status
from rest_framework.response import Response
from .serializers import UserSerializer
from userManager import UserData


# Create your views here.
class LoginValidationView(APIView):
    serializer_class = UserSerializer

    def __init__(self):
        self.user = UserData()
        self.user_data = self.user.user_data

    def post(self, request, format=None):
        dataEntry = self.serializer_class(data=request.data)
        if dataEntry.is_valid():
            usernameEntry = dataEntry.data.get('username')
            passwordEntry = dataEntry.data.get('pwd')
            if (usernameEntry == self.user_data['username']):
                if (passwordEntry == self.user_data['password']):
                    self.user.changeLoggedStatusToTrue()
                    return Response(
                            {'Mensaje': 'Logged In'},
                            status=status.HTTP_200_OK
                            )
                else:
                    return Response(
                            {'Mensaje': 'contraseña incorrecta'},
                            status=status.HTTP_406_NOT_ACCEPTABLE
                            )
            else:
                return Response(
                        {'Mensaje': 'usuario incorrecto'},
                        status=status.HTTP_406_NOT_ACCEPTABLE
                        )
