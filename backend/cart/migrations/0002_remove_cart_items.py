# Generated by Django 4.2.4 on 2023-08-22 19:08

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('cart', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='cart',
            name='items',
        ),
    ]