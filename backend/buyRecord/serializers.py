from django.db.models import fields
from rest_framework import serializers
from .models import BuyRecord

class BuyRecordSerializer(serializers.ModelSerializer):
    class Meta:
        model = BuyRecord
        fields = ('buyId', 'provrId', 'buyDate', 'total')