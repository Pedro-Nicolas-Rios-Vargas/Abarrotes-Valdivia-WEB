from django.db import models

# Create your models here.

class BuyLog(models.Model):
    class Meta:
        db_table = 'buylog_buylog'
        unique_together = (('buyId', 'prodId'),)
    buyId = models.ForeignKey('buyRecord.buyRecord', on_delete=models.CASCADE)
    prodId = models.ForeignKey('producto.Producto', on_delete=models.CASCADE)
    quantityBought = models.IntegerField(default=0, null=False)
