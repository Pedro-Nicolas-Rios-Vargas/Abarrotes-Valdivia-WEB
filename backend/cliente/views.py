from django.shortcuts import render
from rest_framework import generics, request, status
from .serializers import ClienteSerializer, CreateClientSerializer
from .models import Cliente
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.decorators import api_view
import os
import time
import platform
import pipes

# Create your views here.
class ClienteView(generics.ListAPIView):
    queryset = Cliente.objects.all()
    serializer_class = ClienteSerializer

class CreateClienteView(APIView):
    serializer_class = CreateClientSerializer

    def post(self, request, format=None):
        serializer = self.serializer_class(data=request.data)
        #print(serializer)
        if serializer.is_valid():
            nombre_C = serializer.data.get('nombre_C')
            balance = serializer.data.get('balance')
            clientId = serializer.data.get('clientId')
            #print('estupido de mierda no te pierdas es aqui:', clientId)
            #print('~~~~~~~~~~~~~~~~~~~~~', clientId)
            cliente = Cliente(clientId=clientId, nombre_C=nombre_C, 
            balance=balance)
            #print(cliente.clientId)
            cliente.save()
            return Response(ClienteSerializer(cliente).data, status=status.HTTP_201_CREATED)
        #print('ERROR~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~',serializer.errors)
        return Response({'Bad Request': 'Invalid data...'}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'DELETE'])
def otro(request, pk=None):
    client = Cliente.objects.filter(clientId=pk).first()
    if request.method == 'GET':
        client_serializer = ClienteSerializer(client)
        return Response(client_serializer.data, status=status.HTTP_200_OK)
    elif request.method == 'DELETE':
        client.delete()
        return Response({'Mensaje':'Cliente eliminado correctamente'}, status=status.HTTP_200_OK)
    return Response({'ERROR':'No existe ningun cliente con esos datos'}, status=status.HTTP_404_NOT_FOUND)

@api_view(['GET', 'PUT'])
def update(request, pk=None):
    client = Cliente.objects.filter(clientId=pk).first()
    if request.method == 'GET':
        client_serializer = ClienteSerializer(client)
        return Response(client_serializer.data, status=status.HTTP_200_OK)
    elif request.method == 'PUT':
        client_serializer = ClienteSerializer(client, data=request.data)
        if client_serializer.is_valid():
            client_serializer.save()
            return Response(client_serializer.data, status=status.HTTP_200_OK)
        return Response({'Bad Request': 'Invalid data...'}, status=status.HTTP_400_BAD_REQUEST)
    return Response({'ERROR':'No existe ningun cliente con esos datos'}, status=status.HTTP_404_NOT_FOUND)


@api_view(['GET'])
def backUp(request):
    DB_HOST = 'localhost'
    DB_USER = 'root'
    DB_USER_PASSWORD = 'JV_DB$Pr0#bl1&'
    DB_NAME = 'abarrotesvaldiviaWEB'

    if (platform.system() == "Linux"):
        BACKUP_PATH = os.path.abspath(os.path.join(os.getcwd(), os.pardir)) + "/BackUps"
    elif (platform.system() == "Windows"):
        BACKUP_PATH = os.path.abspath(os.path.join(os.getcwd(), os.pardir)) + "\BackUps"
    else:
        BACKUP_PATH = os.getcwd() + "/BackUps"

    DATETIME = time.strftime('%Y-%m-%d-h%Hm%Ms%S')
    TODAYBACKUPPATH = BACKUP_PATH


    try:
        os.stat(TODAYBACKUPPATH)
    except:
        os.mkdir(TODAYBACKUPPATH)



    if (platform.system() == "Windows"):
        dumpcmd = "mysqldump -h " + DB_HOST + " -u " + DB_USER + " -p" + DB_USER_PASSWORD + " " + DB_NAME + " > " + TODAYBACKUPPATH + "\\" + DATETIME + ".bak"
    else:
        dumpcmd = "mysqldump -h " + DB_HOST + " -u " + DB_USER + " -p" + DB_USER_PASSWORD + " " + DB_NAME  + " > " + TODAYBACKUPPATH + "/" + DATETIME + ".bak"

    os.system(dumpcmd)


    return Response({'BackUp': "Your backups have been created in '" + TODAYBACKUPPATH + '/' + DATETIME + '.bak' + "' directory"}, status=status.HTTP_200_OK) 


@api_view(['GET', 'POST'])
def restore(request):
    DB_USER = 'root'
    DB_USER_PASSWORD = "'JV_DB$Pr0#bl1&'"
    DB_NAME = 'abarrotesvaldiviaWEB'
    BACKUP_PATH = ''
    print(request)
    if (platform.system() == "Linux"):
        BACKUP_PATH = os.path.abspath(os.path.join(os.getcwd(), os.pardir)) + "/BackUps/" + request.data.get('fileName')
    elif (platform.system() == "Windows"):
        BACKUP_PATH = os.path.abspath(os.path.join(os.getcwd(), os.pardir)) + "\BackUps" + "\\" + request.data.get('fileName')
    else:
        BACKUP_PATH = os.getcwd() + "/BackUps"

    print("Pito de carro",request.data.get('fileName'))
    command = "mysql -u " + DB_USER + " -p" + DB_USER_PASSWORD + " --database " + DB_NAME + " < " + BACKUP_PATH
    print(command)
    os.system(command)
    print("Restauracion completa")
    return Response({'Restore': "Complete restore"}, status=status.HTTP_200_OK)
