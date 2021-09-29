# Generated by Django 3.2.7 on 2021-09-28 23:22

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('producto', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='producto',
            name='buyPrice',
        ),
        migrations.AddField(
            model_name='producto',
            name='existencia',
            field=models.IntegerField(default=0),
        ),
        migrations.AlterField(
            model_name='producto',
            name='presentacion',
            field=models.CharField(choices=[('Unidad', 'Unidad'), ('Kilogramo', 'Kilogramo')], max_length=20),
        ),
    ]
