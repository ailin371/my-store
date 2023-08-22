from django.db import models
from django.conf import settings

# CharField: A field for short strings.
# TextField: A field for longer text.
# DecimalField: A field for storing decimal numbers, with a given number of total digits and decimal places.
# URLField: A field for storing URLs.
# PositiveIntegerField: A field for storing positive integers.
# DateTimeField: A field for storing date and time. The auto_now_add attribute ensures the field is set to the current date and time when the object is created, while the auto_now attribute ensures it's updated whenever the object is saved.


class Product(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    imageUrl = models.URLField()
    category = models.CharField(max_length=255)
    stock = models.PositiveIntegerField()
    createdAt = models.DateTimeField(auto_now_add=True, null=True, blank=True)
    updatedAt = models.DateTimeField(auto_now=True, null=True, blank=True)
    averageRating = models.DecimalField(max_digits=3, decimal_places=2, default=0.0)

    def __str__(self):
        return self.name


class Review(models.Model):
    product = models.ForeignKey('products.Product', on_delete=models.CASCADE)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    rating = models.PositiveIntegerField()
    comment = models.TextField()
    createdAt = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Review by {self.user.username} on {self.product.name}"

    class Meta:
        unique_together = ['product', 'user']
