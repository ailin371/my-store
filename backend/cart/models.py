from django.db import models
from django.conf import settings
from products.models import Product
from django.db.models import Max


class Cart(models.Model):
    user = models.OneToOneField(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='cart')

    @property
    def totalQuantity(self):
        return sum(item.quantity for item in self.items.all())

    @property
    def totalPrice(self):
        return sum(item.quantity*item.product.price for item in self.items.all())

    def __str__(self):
        return f"Cart of {self.user.username}"


class CartItem(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField(default=1)
    cartId = models.ForeignKey(Cart, related_name='items',
                               on_delete=models.CASCADE, null=True)

    # remove the cart item if quantity is 0
    def save(self, *args, **kwargs):
        if self.quantity <= 0:
            self.delete()
        else:
            super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.product.name} x {self.quantity}"
