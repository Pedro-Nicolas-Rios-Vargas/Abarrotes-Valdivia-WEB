# Generated by Django 3.2.8 on 2021-11-01 10:10

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('BuyLog', '0003_alter_buylog_table'),
    ]

    operations = [
        migrations.AlterModelTable(
            name='buylog',
            table='buylog_buylog',
        ),
    ]