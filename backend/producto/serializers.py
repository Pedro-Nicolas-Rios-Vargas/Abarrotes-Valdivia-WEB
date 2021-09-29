from rest_framework import serializers
from  .models import Producto

class ProductoSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Producto
        fields = ('prodId', 'prodName', 'sellPrice', 'existencia', 'stock', 'presentacion')

class CreatePorductoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Producto
        fields = ('prodName', 'sellPrice',  'existencia', 'stock', 'presentacion')