# Generated by Django 3.2.7 on 2021-09-02 19:54

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Cliente',
            fields=[
                ('clientId', models.AutoField(primary_key=True, serialize=False)),
                ('clientName', models.CharField(max_length=16)),
                ('clientSecondName', models.CharField(max_length=20)),
                ('clientEmail', models.EmailField(max_length=225, null=True)),
                ('clientPhoneNum', models.CharField(max_length=10)),
                ('balance', models.DecimalField(decimal_places=2, max_digits=6)),
            ],
        ),
    ]
