# Generated by Django 4.2.4 on 2023-08-22 19:28

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('cart', '0003_cartitem_cart'),
    ]

    operations = [
        migrations.RenameField(
            model_name='cartitem',
            old_name='cart',
            new_name='cartId',
        ),
        migrations.RenameField(
            model_name='cartitem',
            old_name='product',
            new_name='productId',
        ),
    ]
