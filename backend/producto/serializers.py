from rest_framework import serializers
from  .models import Producto

class ProductoSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Producto
        fields = ('prodId', 'prodName', 'buyPrice', 'sellPrice', 'stock', 'presentacion')

class CreatePorductoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Producto
        fields = ('prodName', 'buyPrice', 'sellPrice', 'stock', 'presentacion')