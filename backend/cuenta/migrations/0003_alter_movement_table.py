# Generated by Django 3.2.8 on 2021-11-01 10:14

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('cuenta', '0002_alter_movement_table'),
    ]

    operations = [
        migrations.AlterModelTable(
            name='movement',
            table='cuenta_movement',
        ),
    ]
