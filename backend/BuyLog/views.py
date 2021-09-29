from backend.buyRecord.models import BuyRecord
from django.shortcuts import render
from rest_framework import generics, request, status
from .serializers import BuyLogSerializer
from BuyLog.models import BuyLog
from producto.models import Producto
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.decorators import api_view

# Create your views here.

class BuyLogView(generics.ListAPIView):
    queryset = BuyLog.objects.all()
    serializer_class = BuyLogSerializer

class CreateBuyLogView(APIView):
    serializer_class = BuyLogSerializer

    def post(self, request, pk=None):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            buyId = serializer.data.get('buyId')
            prodId = serializer.data.get('prodId')
            quantityBought = serializer.data.get('quantityBought')

            producto = Producto.objects.filter(prodId=prodId).first()
            buyRecord = BuyRecord.objects.filter(buyId=buyId).first()

            buyLog = BuyLog(buyId=buyRecord, prodId=producto,
            quantityBought=quantityBought)
            buyLog.save()
            return Response(BuyLogSerializer(buyLog).data, status=status.HTTP_201_CREATED)
        return Response({'Bad Request': 'Invalid data...'}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'DELETE'])
def borrar(request, pk=None):
    buyLog = BuyLog.objects.filter(buyId=pk).first()
    if request.method == 'GET':
        buyLog_serializer = BuyLogSerializer(buyLog)
        return Response(buyLog_serializer.data, status=status.HTTP_200_OK)
    elif request.method == 'DELETE':
        buyLog.delete()
        return Response({'Mensaje':'Compra eliminado correctamente'}, status=status.HTTP_200_OK)
    return Response({'ERROR':'No existe ninguna Compra con esos datos'}, status=status.HTTP_404_NOT_FOUND)

@api_view(['GET', 'PUT'])
def update(request, pk=None):
    buyLog = BuyLog.objects.filter(buyId=pk).first()
    if request.method == 'GET':
        buyLog_serializer = BuyLogSerializer(buyLog)
        return Response(buyLog_serializer.data, status=status.HTTP_200_OK)
    elif request.method == 'PUT':
        buyLog_serializer = BuyLogSerializer(data=request.data)
        if buyLog_serializer.is_valid():
            buyLog_serializer.save()
            return Response(buyLog_serializer.data, status=status.HTTP_200_OK)
        return Response({'Bad Request': 'Invalid data...'}, status=status.HTTP_400_BAD_REQUEST)
    return Response({'ERROR':'No existe ningun cliente con esos datos'}, status=status.HTTP_404_NOT_FOUND)