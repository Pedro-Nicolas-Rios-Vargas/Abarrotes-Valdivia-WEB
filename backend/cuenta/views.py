from django.shortcuts import render
from rest_framework import generics, request, serializers, status

from .serializers import  MovementSerializer
from cuenta.models import Movement
from cliente.models import Cliente
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.decorators import api_view
# Create your views here.

class MovementView(generics.ListAPIView):
    queryset = Movement.objects.all()
    serializer_class = MovementSerializer

class CreateMovementView(APIView):
    serializer_class = MovementSerializer

    def post(self, request, pk=None):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            movementId = serializer.data.get('movementId')
            clientId = serializer.data.get('clientId')
            dateTransaction = serializer.data.get('dateTransaction')
            total = serializer.data.get('total')

            cliente = Cliente.objects.filter(clientId=clientId).first()

            movement = Movement(movementId=movementId, clientId=cliente,
            dateTransaction=dateTransaction, total=total)
            movement.save()
            return Response(MovementSerializer(movement).data, status=status.HTTP_201_CREATED)
        return Response({'Bad Request': 'Invalid data...'}, status=status.HTTP_400_BAD_REQUEST)