from django.db.models.signals import post_save
from django.dispatch import receiver
from products.models import Review
from django.db.models import Sum


@receiver(post_save, sender=Review)
def update_product_rating(sender, instance, **kwargs):
    total_reviews = Review.objects.filter(product=instance.product).count()
    total_rating = Review.objects.filter(
        product=instance.product).aggregate(Sum('rating'))['rating__sum']

    instance.product.averageRating = total_rating / total_reviews
    instance.product.save()
