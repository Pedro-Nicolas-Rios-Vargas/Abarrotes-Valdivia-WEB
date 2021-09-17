from django.db import models

# Create your models here.
choices_type = (
    ("1", "Unidad"),
    ("2", "Kilogramo"),
)

class Producto(models.Model):
    prodId = models.CharField(primary_key=True, max_length=128)
    prodName = models.CharField(max_length=64, null=False)
    buyPrice = models.DecimalField(max_digits=6, decimal_places=2, null=False)
    sellPrice = models.DecimalField(max_digits=6, decimal_places=2, null=False)
    stock = models.IntegerField(default=0, null=False)
    presentacion = models.CharField(choices=choices_type, max_length=20)