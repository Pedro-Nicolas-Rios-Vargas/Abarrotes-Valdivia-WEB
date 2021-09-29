from rest_framework import serializers
from .models import Cliente

class ClienteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cliente
        fields = ('clientId', 'nombre_C', 'balance')

class CreateClientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cliente
        fields = ('nombre_C', 'balance')

        