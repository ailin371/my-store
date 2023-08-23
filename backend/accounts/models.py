from django.conf import settings
from django.db import models
from django.contrib.auth.models import AbstractUser
from products.models import Product


class CustomUser(AbstractUser):
    image = models.ImageField(upload_to='profile_pics', null=True, blank=True) # This is the field where the image will be stored. 'upload_to' specifies the subdirectory of 'MEDIA_DIR' where the photos will go.


class Purchase(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL,
                             on_delete=models.CASCADE)
    purchaseDate = models.DateTimeField(auto_now_add=True)
    totalCost = models.DecimalField(max_digits=10, decimal_places=2)


class PurchaseItem(models.Model):
    purchase = models.ForeignKey(
        Purchase, on_delete=models.CASCADE, related_name='items')
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField(default=1)
    priceAtPurchase = models.DecimalField(max_digits=10, decimal_places=2)
