from django.core.mail import send_mail
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.response import Response
from .serializers import UserSerializer, RecoveringPassword
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


class RecoveringAccess(APIView):
    serializer_class = RecoveringPassword

    def __init__(self):
        self.user = UserData()
        self.user_data = self.user.user_data

    def post(self, request, format=None):
        dataEntry = self.serializer_class(data=request.data)
        if dataEntry.is_valid():
            msg = dataEntry.data.get('msg')
            if msg == 'Neovim<3':
                try:
                    send_mail(
                            'Prueba correo',
                            'Hoal Pedro',
                            None,
                            ['pv123124@gmail.com'],
                            fail_silently=False,
                            )
                except Exception as e:
                    print(e)
                    return Response(
                            {'Mensaje': 'Error'},
                            status=status.HTTP_400_BAD_REQUEST
                            )

                return Response(
                        {'Mensaje': 'Enviado'},
                        status=status.HTTP_200_OK
                        )
            else:
                return Response(
                        {'Mensaje': 'Mensaje erroneo'},
                        status=status.HTTP_400_BAD_REQUEST
                        )
