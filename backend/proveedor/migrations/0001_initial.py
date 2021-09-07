# Generated by Django 3.2.7 on 2021-09-06 20:54

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Proveedor',
            fields=[
                ('provrId', models.AutoField(primary_key=True, serialize=False)),
                ('provName', models.CharField(max_length=16)),
                ('provEmail', models.EmailField(max_length=225, null=True)),
                ('provPhoneNum', models.CharField(max_length=10)),
            ],
        ),
    ]
