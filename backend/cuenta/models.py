from django.db import models

# Create your models here.
class Movement(models.Model):
    class Meta:
        db_table = 'cuenta_movement'
        unique_together = (('clientId','movementId'),)

    movementId = models.AutoField(primary_key=True)
    clientId = models.ForeignKey('cliente.Cliente', on_delete=models.CASCADE)
    dateTransaction = models.DateField(null=True)
    total = models.DecimalField(max_digits=6, decimal_places=2, null=False)
