# Generated by Django 3.2.7 on 2021-09-28 23:22

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('cliente', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='cliente',
            old_name='clientName',
            new_name='nombre_C',
        ),
        migrations.RemoveField(
            model_name='cliente',
            name='clientEmail',
        ),
        migrations.RemoveField(
            model_name='cliente',
            name='clientPhoneNum',
        ),
        migrations.RemoveField(
            model_name='cliente',
            name='clientSecondName',
        ),
    ]
