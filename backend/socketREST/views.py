from rest_framework.views import APIView
from rest_framework import status
from rest_framework.response import Response
from .serializers import SocketSerializer
from BCScript.server import ServerSocket
import socket
import codecs


# Create your views here.
class ServerSocketView(APIView):
    serializer_class = SocketSerializer

    def __init__(self):
        self.endServer = False
        self.serverInstance = ServerSocket()
        self.runServer = True

    def post(self, request, format=None):
        print("\n\nHoal\n\n")
        dataEntry = self.serializer_class(data=request.data)

        print(f'\n\ndataEntry: { dataEntry }\n\n')

        if dataEntry.is_valid():
            barcode = self.serverInstance.initServer()
            if (barcode):
                return Response(
                        {'Barcode': barcode},
                        status=status.HTTP_200_OK
                        )
            else:
                return Response(
                        {'Barcode': 'No barcode'},
                        status=status.HTTP_408_REQUEST_TIMEOUT
                        )
