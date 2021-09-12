from django.shortcuts import render
from rest_framework import generics, request, status
from .serializers import ProveedorSerializer, CreateProveedorSerializer
from .models import Proveedor
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.decorators import api_view

# Create your views here.

class ProveedorView(generics.ListAPIView):
    queryset = Proveedor.objects.all()
    serializer_class = ProveedorSerializer

class CreateProveedorView(APIView):
    serializer_class = CreateProveedorSerializer
    def post(self, request, format=None):
        serializer = self.serializer_class(data=request.data)
        print(serializer)
        if serializer.is_valid():
            provName = serializer.data.get('provName')
            provEmail = serializer.data.get('provEmail')
            provPhoneNum = serializer.data.get('provPhoneNum')
            provrId = serializer.data.get('provrId')

            proveedor = Proveedor(provrId=provrId, provName=provName,
            provEmail=provEmail, provPhoneNum=provPhoneNum)
            proveedor.save()
            return Response(ProveedorSerializer(proveedor).data, status=status.HTTP_200_OK)
        return Response({'Bad Resquest': 'Invalid data'}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'DELETE'])
def borracion(request, pk=None):
    proveedor = Proveedor.objects.filter(provrId=pk).first()
    if request.method == 'GET':
        proveedor_serializer = ProveedorSerializer(proveedor)
        return Response(proveedor_serializer.data, status=status.HTTP_200_OK)
    elif request.method == 'DELETE':
        proveedor.delete()
        return Response({'Mensaje':'Proveedor eliminado correctamente'}, status=status.HTTP_200_OK)
    return Response({'ERROR':'No existe ningun Proveedor con esos datos'}, status=status.HTTP_404_NOT_FOUND)

@api_view(['GET', 'PUT'])
def update(request, pk=None):
    proveedor = Proveedor.objects.filter(provrId=pk).first()
    if request.method == 'GET':
        proveedor_serializer = ProveedorSerializer(proveedor)
        return Response(proveedor_serializer.data, status=status.HTTP_200_OK)
    elif request.method == 'PUT':
        proveedor_serializer = ProveedorSerializer(data=request.data)
        if proveedor_serializer.is_valid():
            proveedor_serializer.save()
            return Response(proveedor_serializer.data, status=status.HTTP_200_OK)
        return Response({'Bad Request': 'Invalid data...'}, status=status.HTTP_400_BAD_REQUEST)
    return Response({'ERROR':'No existe ningun Proveedor con esos datos'}, status=status.HTTP_404_NOT_FOUND)