from django.apps import AppConfig


class ProductsConfig(AppConfig):
    name = 'products'
    default_auto_field = 'django.db.models.BigAutoField'

    def ready(self):
        # Import the signal module to register the signal handlers
        import products.signals
