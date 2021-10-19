from rest_framework.views import APIView
from rest_framework import status
from rest_framework.response import Response
from .serializers import UserSerializer
import json


# Create your views here.
class loginValidationView(APIView):
    serializer_class = UserSerializer

    def __init__(self):
        from os import getcwd
        print(getcwd())  # Solo para saber cual es el directorio base
        self.log_path = './user.json'
        self.user_data = self._getUserLog()

    def post(self, request, format=None):
        dataEntry = self.serializer_class(data=request.data)
        if dataEntry.is_valid():
            usernameEntry = dataEntry.data.get('username')
            passwordEntry = dataEntry.data.get('pwd')
            if (usernameEntry == self.user_data['username']):
                if (passwordEntry == self.user_data['password']):
                    #self._changeLoggedStatusToTrue()
                    self._changeLoggedStatusToFalse()
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

    def _getUserLog(self):
        user = {}
        with open(self.log_path, 'r') as user_log:
            user = json.load(user_log)

        return user

    def _changeLoggedStatusToTrue(self):
        if self.user_data['Logged'] is False:
            self.user_data['Logged'] = True
        else:
            print('Ya era verdadero dx')

        with open(self.log_path, 'w') as user_log:
            json.dump(self.user_data, user_log)

    def _changeLoggedStatusToFalse(self):
        if self.user_data['Logged'] is True:
            self.user_data['Logged'] = False
        else:
            print('Ya era falso xd')

        with open(self.log_path, 'w') as user_log:
            json.dump(self.user_data, user_log)
