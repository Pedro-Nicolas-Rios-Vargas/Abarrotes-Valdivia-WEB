from django.shortcuts import render
from rest_framework import generics, request, serializers, status
from .serializers import SellRecordSerializer
from sellRecord.models import SellRecord
from cliente.models import Cliente
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.decorators import api_view

# Create your views here.

class SellRecordView(generics.ListAPIView):
    queryset = SellRecord.objects.all()
    serializer_class = SellRecordSerializer

class CreateSellRecordView(APIView):
    serializer_class = SellRecordSerializer

    def post(self, request, pk=None):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            sellId = serializer.data.get('sellId')
            clientId = serializer.data.get('clientId')
            sellDate = serializer.data.get('sellDate')
            total = serializer.data.get('total')

            cliente = Cliente.objects.filter(clientId=clientId).first()

            buyLog = SellRecord(sellId=sellId, clientId=cliente,
            sellDate=sellDate, total=total)
            buyLog.save()
            return Response(SellRecordSerializer(buyLog).data, status=status.HTTP_201_CREATED)
        return Response({'Bad Request': 'Invalid data...'}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'DELETE'])
def borrar(request, pk=None):
    buyLog = SellRecord.objects.filter(sellId=pk).first()
    if request.method == 'GET':
        buyLog_serializer = SellRecordSerializer(buyLog)
        return Response(buyLog_serializer.data, status=status.HTTP_200_OK)
    elif request.method == 'DELETE':
        buyLog.delete()
        return Response({'Mensaje':'Compra eliminado correctamente'}, status=status.HTTP_200_OK)
    return Response({'ERROR':'No existe ninguna Compra con esos datos'}, status=status.HTTP_404_NOT_FOUND)

@api_view(['GET', 'PUT'])
def update(request, pk=None):
    buyLog = SellRecord.objects.filter(sellId=pk).first()
    if request.method == 'GET':
        buyLog_serializer = SellRecordSerializer(buyLog)
        return Response(buyLog_serializer.data, status=status.HTTP_200_OK)
    elif request.method == 'PUT':
        buyLog_serializer = SellRecordSerializer(data=request.data)
        if buyLog_serializer.is_valid():
            buyLog_serializer.save()
            return Response(buyLog_serializer.data, status=status.HTTP_200_OK)
        return Response({'Bad Request': 'Invalid data...'}, status=status.HTTP_400_BAD_REQUEST)
    return Response({'ERROR':'No existe ningun cliente con esos datos'}, status=status.HTTP_404_NOT_FOUND)