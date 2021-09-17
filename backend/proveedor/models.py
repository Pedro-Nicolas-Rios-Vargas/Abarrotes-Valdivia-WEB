from django.db import models

# Create your models here.
class Proveedor(models.Model):
    provrId = models.AutoField(primary_key=True)
    provName = models.CharField(max_length=16, null=False)
    provPhoneNum =models.CharField(max_length=10,null=False)