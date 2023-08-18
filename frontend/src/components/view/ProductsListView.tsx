import React from 'react';
import { Card, CardContent, CardMedia, Typography, Grid } from '@mui/material';
import Product from '../../models/Product';

interface ProductListViewProps {
    products: Product[],
    onProductClick: (product: Product) => void,
}

const ProductListView: React.FC<ProductListViewProps> = ({ products, onProductClick }) => {
    return (
        <Grid container spacing={3}>
            {products.map((product) => (
                <Grid item xs={12} sm={6} md={4} key={product.id}>
                    <Card onClick={() => onProductClick(product)} sx={{ cursor: 'pointer' }}>
                        <CardMedia
                            component="img"
                            height="140"
                            image={product.imageUrl}
                            alt={product.name}
                        />
                        <CardContent>
                            <Typography variant="h5" component="div">
                                {product.name}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {product.description}
                            </Typography>
                            <Typography variant="h6">
                                ${product.price.toFixed(2)}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            ))}
        </Grid>
    );
}

export default ProductListView;
