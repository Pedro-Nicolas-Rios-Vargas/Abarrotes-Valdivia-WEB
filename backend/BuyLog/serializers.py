from django.db.models import fields
from rest_framework import serializers
from .models import BuyLog

class BuyLogSerializer(serializers.ModelSerializer):
    class Meta:
        model = BuyLog
        fields = ('buyId', 'prodId', 'quantityBought')