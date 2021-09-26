from rest_framework import serializers
from .models import Cliente

class ClienteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cliente
        fields = ('clientId', 'clientName', 'clientSecondName', 
        'clientEmail', 'clientPhoneNum', 'balance')

class CreateClientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cliente
        fields = ('clientName', 'clientSecondName', 
        'clientEmail', 'clientPhoneNum', 'balance')

        