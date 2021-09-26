from django.db import models
# Create your models here.

class BuyRecord(models.Model):
    buyId = models.AutoField(primary_key=True)
    provrId = models.ForeignKey('proveedor.Proveedor', on_delete=models.CASCADE, null=False)
    buyDate = models.DateField(null=False)
    total = models.DecimalField(max_digits=6, decimal_places=2, null=False)