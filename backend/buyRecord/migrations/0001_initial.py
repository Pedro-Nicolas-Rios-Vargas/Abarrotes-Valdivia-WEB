# Generated by Django 3.2.7 on 2021-09-11 18:30

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('proveedor', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='buyRecord',
            fields=[
                ('buyId', models.AutoField(primary_key=True, serialize=False)),
                ('buyDate', models.DateField()),
                ('total', models.DecimalField(decimal_places=2, max_digits=6)),
                ('provrId', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='proveedor.proveedor')),
            ],
        ),
    ]
