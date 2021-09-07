from django.shortcuts import render
from rest_framework import generics, request, status
from .serializers import ClienteSerializer, CreateClientSerializer
from .models import Cliente
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.decorators import api_view


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
            clientName = serializer.data.get('clientName')
            clientSecondName = serializer.data.get('clientSecondName')
            clientEmail = serializer.data.get('clientEmail')
            clientPhoneNum = serializer.data.get('clientPhoneNum')
            balance = serializer.data.get('balance')
            clientId = serializer.data.get('clientId')
            #print('estupido de mierda no te pierdas es aqui:', clientId)
            #print('~~~~~~~~~~~~~~~~~~~~~', clientId)
            cliente = Cliente(clientId=clientId, clientName=clientName, 
            clientSecondName=clientSecondName, clientEmail=clientEmail,
            clientPhoneNum= clientPhoneNum, balance=balance)
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
        #print(client_serializer.data)
        return Response(client_serializer.data, status=status.HTTP_200_OK)
    elif request.method == 'PUT':
        client_serializer = ClienteSerializer(data=request.data)
        print(client_serializer)
        if client_serializer.is_valid():
            client_serializer.save()
            return Response(client_serializer.data, status=status.HTTP_200_OK)
        return Response({'Bad Request': 'Invalid data...'}, status=status.HTTP_400_BAD_REQUEST)
    return Response({'ERROR':'No existe ningun cliente con esos datos'}, status=status.HTTP_404_NOT_FOUND)

    