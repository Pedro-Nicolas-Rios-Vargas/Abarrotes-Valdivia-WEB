from django.db import models

# Create your models here.
class Cliente(models.Model):
    clientId = models.AutoField(primary_key=True)
    nombre_C = models.CharField(max_length=16, null=False)
    balance =  models.DecimalField(max_digits=6, decimal_places=2)