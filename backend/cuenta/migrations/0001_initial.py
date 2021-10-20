# Generated by Django 3.2.7 on 2021-10-15 16:09

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('cliente', '0002_auto_20210928_2322'),
    ]

    operations = [
        migrations.CreateModel(
            name='Movement',
            fields=[
                ('movementId', models.AutoField(primary_key=True, serialize=False)),
                ('dateTransaction', models.DateField(null=True)),
                ('total', models.DecimalField(decimal_places=2, max_digits=6)),
                ('clientId', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='cliente.cliente')),
            ],
            options={
                'unique_together': {('clientId', 'movementId')},
            },
        ),
    ]