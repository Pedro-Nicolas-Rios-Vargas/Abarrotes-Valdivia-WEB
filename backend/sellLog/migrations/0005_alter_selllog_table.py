# Generated by Django 3.2.8 on 2021-11-01 10:14

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('sellLog', '0004_alter_selllog_table'),
    ]

    operations = [
        migrations.AlterModelTable(
            name='selllog',
            table='selllog_selllog',
        ),
    ]