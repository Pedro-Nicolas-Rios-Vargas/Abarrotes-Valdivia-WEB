from backend.sellRecord.models import SellRecord
from backend.producto.models import Producto
from django.shortcuts import render
from rest_framework import generics, request, status
from .serializers import SellLogSerializer
from sellLog.models import SellLog
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.decorators import api_view
# Create your views here.

class SellLogView(generics.ListAPIView):
    queryset = SellLog.objects.all()
    serializer_class = SellLogSerializer

class CreateSellLogView(APIView):
    serializer_class = SellLogSerializer

    def post(self, request, pk=None):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            sellId = serializer.data.get('sellId')
            prodId = serializer.data.get('prodId')
            quantityBought = serializer.data.get('quantityBought')

            producto = Producto.objects.filter(prodId=prodId).first()
            sellRecord = SellRecord.objects.filter(sellId=sellId).filter()

            sellLog = SellLog(sellId=sellRecord, prodId=producto,
            quantityBought=quantityBought)

            sellLog.save()
            return Response(SellLogSerializer(sellLog).data, status=status.HTTP_201_CREATED)
        return Response({'Bad Request': 'Invalid data...'}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'DELETE'])
def borrar(request, pk=None):
    sellLog = SellLog.objects.filter(buyId=pk).first()
    if request.method == 'GET':
        SellLog_serializer = SellLogSerializer(sellLog)
        return Response(SellLog_serializer.data, status=status.HTTP_200_OK)
    elif request.method == 'DELETE':
        SellLog.delete()
        return Response({'Mensaje':'Compra eliminado correctamente'}, status=status.HTTP_200_OK)
    return Response({'ERROR':'No existe ninguna Compra con esos datos'}, status=status.HTTP_404_NOT_FOUND)

@api_view(['GET', 'PUT'])
def update(request, pk=None):
    sellLog = SellLog.objects.filter(buyId=pk).first()
    if request.method == 'GET':
        SellLog_serializer = SellLogSerializer(sellLog)
        return Response(SellLog_serializer.data, status=status.HTTP_200_OK)
    elif request.method == 'PUT':
        SellLog_serializer = SellLogSerializer(data=request.data)
        if SellLog_serializer.is_valid():
            SellLog_serializer.save()
            return Response(SellLog_serializer.data, status=status.HTTP_200_OK)
        return Response({'Bad Request': 'Invalid data...'}, status=status.HTTP_400_BAD_REQUEST)
    return Response({'ERROR':'No existe ningun cliente con esos datos'}, status=status.HTTP_404_NOT_FOUND)