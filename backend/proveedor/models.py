from django.db import models

# Create your models here.
class Proveedor(models.Model):
    class Meta:
        db_table = 'proveedor_proveedor'
    provrId = models.AutoField(primary_key=True)
    provName = models.CharField(max_length=32, null=False)
    provPhoneNum =models.CharField(max_length=10,null=False)
