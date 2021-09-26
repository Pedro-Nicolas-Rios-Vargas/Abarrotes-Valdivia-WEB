from django.db import models

# Create your models here.
class Cliente(models.Model):
    clientId = models.AutoField(primary_key=True)
    clientName = models.CharField(max_length=16, null=False)
    clientSecondName = models.CharField(max_length=20, null=False)
    clientEmail = models.EmailField(max_length=225, null= True) 
    clientPhoneNum =models.CharField(max_length=10,null=False)
    balance =  models.DecimalField(max_digits=6, decimal_places=2)