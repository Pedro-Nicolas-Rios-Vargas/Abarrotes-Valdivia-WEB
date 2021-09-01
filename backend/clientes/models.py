from django.db import models

# Create your models here.

class Products(models.Model):
    prodID = models.CharField(max_length = 128, primary_key = True)
    prodName = models.CharField(max_length = 64)
    buyPrice = models.FloatField;
    sellPrice = models.FloatField();
    stock = models.IntegerField();
    presentation = [ 'empaquetado', 'por unidad' ]
