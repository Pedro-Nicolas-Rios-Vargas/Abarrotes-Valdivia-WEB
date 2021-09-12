from django.db.models import fields
from rest_framework import serializers
from .models import SellRecord

class SellRecordSerializer(serializers.ModelSerializer):
    class Meta:
        model = SellRecord
        fields = ('sellId', 'clientId', 'sellDate', 'total')