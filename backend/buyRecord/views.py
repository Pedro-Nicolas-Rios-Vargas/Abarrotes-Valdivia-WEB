from django.shortcuts import render
from rest_framework import generics, request, status
from .serializers import BuyRecordSerializer
from buyRecord.models import BuyRecord
from proveedor.models import Proveedor
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.decorators import api_view

# Create your views here.

class BuyRecordView(generics.ListAPIView):
    queryset = BuyRecord.objects.all()
    serializer_class = BuyRecordSerializer

class CreateBuyRecordView(APIView):
    serializer_class = BuyRecordSerializer

    def post(self, request, pk=None):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            #print('pinga de oso macho',serializer.data)
            buyDate = serializer.data.get('buyDate')
            total = serializer.data.get('total')
            buyId = serializer.data.get('buyId')
            provrId = serializer.data.get('provrId')

            proveedor = Proveedor.objects.filter(provrId=provrId).first()
            #print('Maka joto',proveedor)

            buyRecord = BuyRecord(buyId=buyId, provrId=proveedor,
            buyDate=buyDate, total=total)
            buyRecord.save()
            return Response(BuyRecordSerializer(buyRecord).data, status=status.HTTP_201_CREATED)
        return Response({'Bad Request': 'Invalid data...'}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'DELETE'])
def borrar(request, pk=None):
    buyRecord = BuyRecord.objects.filter(buyId=pk).first()
    if request.method == 'GET':
        buyRecord_serializer = BuyRecordSerializer(buyRecord)
        return Response(buyRecord_serializer.data, status=status.HTTP_200_OK)
    elif request.method == 'DELETE':
        buyRecord.delete()
        return Response({'Mensaje':'Compra eliminado correctamente'}, status=status.HTTP_200_OK)
    return Response({'ERROR':'No existe ninguna Compra con esos datos'}, status=status.HTTP_404_NOT_FOUND)

@api_view(['GET', 'PUT'])
def update(request, pk=None):
    buyRecord = BuyRecord.objects.filter(buyId=pk).first()
    if request.method == 'GET':
        buyRecord_serializer = BuyRecordSerializer(buyRecord)
        return Response(buyRecord_serializer.data, status=status.HTTP_200_OK)
    elif request.method == 'PUT':
        buyRecord_serializer = BuyRecordSerializer(data=request.data)
        if buyRecord_serializer.is_valid():
            buyRecord_serializer.save()
            return Response(buyRecord_serializer.data, status=status.HTTP_200_OK)
        return Response({'Bad Request': 'Invalid data...'}, status=status.HTTP_400_BAD_REQUEST)
    return Response({'ERROR':'No existe ningun cliente con esos datos'}, status=status.HTTP_404_NOT_FOUND)