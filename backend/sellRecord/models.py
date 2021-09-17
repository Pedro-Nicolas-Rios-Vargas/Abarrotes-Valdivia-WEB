from django.db import models

# Create your models here.
class SellRecord(models.Model):
    class Meta:
        unique_together = (('sellId','clientId'),)
    sellId = models.AutoField(primary_key=True)
    clientId = models.ForeignKey('cliente.Cliente', on_delete=models.CASCADE)
    sellDate = models.DateField(null=False)
    total = models.DecimalField(max_digits=6, decimal_places=2, null=False)