from django.core.management.base import BaseCommand
from products.models import Product

PRODUCTS = [
    {
        "id": 1,
        "name": "Laptop",
        "description": "15-inch, 256GB SSD, 8GB RAM",
        "price": 1200.00,
        "imageUrl": "https://img-prod-cms-rt-microsoft-com.akamaized.net/cms/api/am/imageFileData/RE4OXzi?ver=3a58",
        "category": "Electronics",
        "stock": 20,
        "createdAt": "2023-01-01T00:00:00.000Z",
        "updatedAt": "2023-01-10T00:00:00.000Z"
    },
    {
        "id": 2,
        "name": "Smartphone",
        "description": "6.5-inch, 128GB Storage",
        "price": 800.00,
        "imageUrl": "https://cdn.mos.cms.futurecdn.net/Q9pYovxyrWr8Bfxv3HztvJ.jpg",
        "category": "Electronics",
        "stock": 30,
        "createdAt": "2023-01-05T00:00:00.000Z",
        "updatedAt": "2023-01-15T00:00:00.000Z"
    },
    {
        "id": 3,
        "name": "Bluetooth Speaker",
        "description": "Portable, 10W output",
        "price": 50.00,
        "imageUrl": "https://www.cnet.com/a/img/resize/2dec6af3d496a65176f980673cd25a51cf8af58b/hub/2023/05/23/d0c34ee8-00fd-46a0-ad1c-41784248f4a1/soundcore-by-anker-mini-3-yellow-background.png?auto=webp&fit=crop&height=360&width=640",
        "category": "Electronics",
        "stock": 100,
        "createdAt": "2023-02-01T00:00:00.000Z",
        "updatedAt": "2023-02-10T00:00:00.000Z"
    },
    {
        "id": 4,
        "name": "Wireless Headphones",
        "description": "Over-ear, Noise-cancelling",
        "price": 150.00,
        "imageUrl": "https://www.energysistem.com/cdnassets/products/45305/principal_2000.jpg",
        "category": "Electronics",
        "stock": 50,
        "createdAt": "2023-02-05T00:00:00.000Z",
        "updatedAt": "2023-02-15T00:00:00.000Z"
    },
    {
        "id": 5,
        "name": "Smart Watch",
        "description": "Heart-rate monitor, GPS",
        "price": 250.00,
        "imageUrl": "https://m.media-amazon.com/images/I/61MQsr9LgwL.jpg",
        "category": "Wearables",
        "stock": 40,
        "createdAt": "2023-02-07T00:00:00.000Z",
        "updatedAt": "2023-02-17T00:00:00.000Z"
    },
    {
        "id": 6,
        "name": "Gaming Mouse",
        "description": "RGB, 6000 DPI",
        "price": 45.00,
        "imageUrl": "https://i.ebayimg.com/images/g/B3oAAOSweRJjhCeo/s-l1200.jpg",
        "category": "Gaming",
        "stock": 150,
        "createdAt": "2023-03-01T00:00:00.000Z",
        "updatedAt": "2023-03-11T00:00:00.000Z"
    },
    {
        "id": 7,
        "name": "Table Lamp",
        "description": "LED, Adjustable Brightness",
        "price": 30.00,
        "imageUrl": "https://hips.hearstapps.com/vader-prod.s3.amazonaws.com/1676386932-30770025.jpg?crop=1xw:1.00xh;center,top&resize=980:*",
        "category": "Home",
        "stock": 120,
        "createdAt": "2023-03-05T00:00:00.000Z",
        "updatedAt": "2023-03-15T00:00:00.000Z"
    },
    {
        "id": 8,
        "name": "Coffee Maker",
        "description": "12 Cups, Automatic",
        "price": 60.00,
        "imageUrl": "https://hips.hearstapps.com/hmg-prod/images/ghi-coffeeexpressomakers-1677277705.png",
        "category": "Kitchen Appliances",
        "stock": 80,
        "createdAt": "2023-03-10T00:00:00.000Z",
        "updatedAt": "2023-03-20T00:00:00.000Z"
    },
    {
        "id": 9,
        "name": "Running Shoes",
        "description": "Size 10, Breathable Mesh",
        "price": 80.00,
        "imageUrl": "https://s3.amazonaws.com/www.irunfar.com/wp-content/uploads/2023/01/13204819/best-trail-running-shoe-brands-Nike-Kiger-8.jpg",
        "category": "Footwear",
        "stock": 0,
        "createdAt": "2023-04-01T00:00:00.000Z",
        "updatedAt": "2023-04-10T00:00:00.000Z"
    },
    {
        "id": 10,
        "name": "Backpack",
        "description": "20L, Waterproof",
        "price": 70.00,
        "imageUrl": "https://hips.hearstapps.com/hmg-prod/images/gh-index-backpacks-067-web-preview-1660836912.jpg",
        "category": "Accessories",
        "stock": 3,
        "createdAt": "2023-04-05T00:00:00.000Z",
        "updatedAt": "2023-04-15T00:00:00.000Z"
    }
]


class Command(BaseCommand):
    help = 'Load products from a JSON list'

    def handle(self, *args, **kwargs):
        for product_data in PRODUCTS:
            product = Product(
                id=product_data['id'],
                name=product_data['name'],
                description=product_data['description'],
                price=product_data['price'],
                imageUrl=product_data['imageUrl'],
                category=product_data['category'],
                stock=product_data['stock'],
                createdAt=product_data['createdAt'],
                updatedAt=product_data['updatedAt'],
            )
            product.save()
            self.stdout.write(self.style.SUCCESS(
                f"Successfully added product {product.name}"))
