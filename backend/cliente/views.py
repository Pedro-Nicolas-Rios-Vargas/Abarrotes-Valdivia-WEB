from django.shortcuts import render
from rest_framework import generics
from .serializers import ClienteSerializer
from .models import Cliente
# Create your views here.
class ClienteView(generics.CreateAPIView):
    queryset = Cliente.objects.all()
    serializer_class = ClienteSerializer
