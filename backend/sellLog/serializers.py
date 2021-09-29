from django.db.models import fields
from rest_framework import  serializers
from .models import SellLog

class SellLogSerializer(serializers.ModelSerializer):
    class Meta:
        model = SellLog
        fields = ('sellId', 'prodId', 'quantityBought')