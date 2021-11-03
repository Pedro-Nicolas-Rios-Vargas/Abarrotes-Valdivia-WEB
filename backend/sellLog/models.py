from django.db import models

# Create your models here.
class SellLog(models.Model):
    class Meta:
        db_table = 'selllog_selllog'
        unique_together = (('sellId','prodId'),)
    sellId = models.ForeignKey('sellRecord.SellRecord', on_delete=models.CASCADE)
    prodId = models.ForeignKey('producto.Producto', on_delete=models.CASCADE)
    quantityBought = models.IntegerField(default=0, null=False)
    
