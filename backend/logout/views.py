from rest_framework.views import APIView
from rest_framework import status
from rest_framework.response import Response
from userManager import UserData
from .serializers import LogoutSerializer


# Create your views here.
class LogoutView(APIView):
    serializer_class = LogoutSerializer

    def __init__(self):
        self.user = UserData()
        self.user_data = self.user.user_data

    def post(self, request, fromat=None):
        dataEntry = self.serializer_class(data=request.data)
        if dataEntry.is_valid():
            self.user.changeLoggedStatusToFalse()
            return Response(
                    {'Mensaje': 'Salir'},
                    status=status.HTTP_200_OK
                    )
        else:
            return Response(
                    {'Mensaje': 'Esto no deberia ocurrir'},
                    status=status.HTTP_400_BAD_REQUEST
                    )
