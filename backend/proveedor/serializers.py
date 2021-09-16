from django.db.models import fields
from rest_framework import serializers
from .models import Proveedor

class ProveedorSerializer(serializers.ModelSerializer):

    class Meta:
        model = Proveedor
        fields = ('provrId', 'provName', 'provPhoneNum')

class CreateProveedorSerializer(serializers.ModelSerializer):
    class Meta:
        
        model = Proveedor
        fields = ('provName', 'provPhoneNum')