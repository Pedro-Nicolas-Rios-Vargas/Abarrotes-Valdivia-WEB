# Generated by Django 3.2.7 on 2021-09-11 19:53

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('cliente', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='SellRecord',
            fields=[
                ('sellId', models.AutoField(primary_key=True, serialize=False)),
                ('sellDate', models.DateField()),
                ('total', models.DecimalField(decimal_places=2, max_digits=6)),
                ('clientId', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='cliente.cliente')),
            ],
            options={
                'unique_together': {('sellId', 'clientId')},
            },
        ),
    ]