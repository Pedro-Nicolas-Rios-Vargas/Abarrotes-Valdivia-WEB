from django.shortcuts import render
from rest_framework import generics, request, status
from .serializers import ProductoSerializer
from .models import Producto
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.decorators import api_view
# Create your views here.

class ProductoView(generics.ListAPIView):
    queryset = Producto.objects.all()
    serializer_class = ProductoSerializer

class CreateProductoeView(APIView):
    serializer_class = ProductoSerializer

    def post(self, request, format=None):
        serializer = self.serializer_class(data=request.data)
        #print(serializer)
        if serializer.is_valid():
            prodName = serializer.data.get('prodName')
            buyPrice = serializer.data.get('buyPrice')
            sellPrice = serializer.data.get('sellPrice')
            stock = serializer.data.get('stock')
            presentacion = serializer.data.get('presentacion')
            prodId = serializer.data.get('prodId')
            #print('estupido de mierda no te pierdas es aqui:', clientId)
            #print('~~~~~~~~~~~~~~~~~~~~~', clientId)
            producto = Producto(prodId=prodId, prodName=prodName, 
            buyPrice=buyPrice, sellPrice=sellPrice,
            stock=stock, presentacion=presentacion)
            #print(producto.clientId)
            producto.save()
            return Response(ProductoSerializer(producto).data, status=status.HTTP_201_CREATED)
        #print('ERROR~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~',serializer.errors)
        return Response({'Bad Request': 'Invalid data...'}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'DELETE'])
def otro(request, pk=None):
    productos = Producto.objects.filter(prodId=pk).first()
    if request.method == 'GET':
        productos_serializer = ProductoSerializer(productos)
        return Response(productos_serializer.data, status=status.HTTP_200_OK)
    elif request.method == 'DELETE':
        productos.delete()
        return Response({'Mensaje':'Producto eliminado correctamente'}, status=status.HTTP_200_OK)
    return Response({'ERROR':'No existe ningun Producto con esos datos'}, status=status.HTTP_404_NOT_FOUND)

@api_view(['GET', 'PUT'])
def update(request, pk=None):
    productos = Producto.objects.filter(prodId=pk).first()
    if request.method == 'GET':
        productos_serializer = ProductoSerializer(productos)
        return Response(productos_serializer.data, status=status.HTTP_200_OK)
    elif request.method == 'PUT':
        productos_serializer = ProductoSerializer(data=request.data)
        if productos_serializer.is_valid():
            productos_serializer.save()
            return Response(productos_serializer.data, status=status.HTTP_200_OK)
        return Response({'Bad Request': 'Invalid data...'}, status=status.HTTP_400_BAD_REQUEST)
    return Response({'ERROR':'No existe ningun Producto con esos datos'}, status=status.HTTP_404_NOT_FOUND)
