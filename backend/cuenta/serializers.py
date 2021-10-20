from django.db.models import fields
from rest_framework import serializers
from .models import Movement

class MovementSerializer(serializers.ModelSerializer):
    class Meta:
        model = Movement
        fields = ('movementId', 'clientId', 'dateTransaction', 'total')