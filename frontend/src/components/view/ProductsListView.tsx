import React, { useState } from 'react';
import { Card, CardContent, CardMedia, Typography, Grid, Pagination } from '@mui/material';
import Product from '../../models/Product';

export interface ProductListViewProps {
    products: Product[],
    onProductClick: (product: Product) => void,
    itemsPerPage?: number,
}

const ProductListView: React.FC<ProductListViewProps> = ({ products, onProductClick, itemsPerPage = 6 }) => {
    const [currentPage, setCurrentPage] = useState<number>(1);
    const totalPages = Math.ceil(products.length / itemsPerPage);
    const currentProducts = products.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    const placeholdersCount = itemsPerPage - currentProducts.length;
    const placeholders = Array.from({ length: placeholdersCount }).map(() => ({}));

    return (
        <div>
            <Grid container spacing={3} sx={{ pt: 1 }}>
                {currentProducts.map((product) => (
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
                {placeholders.map((_placeholder, i) => {
                    const product = currentProducts[0];

                    return (
                        <Grid item xs={12} sm={6} md={4} key={i} sx={{ visibility: 'hidden' }}>
                            <Card onClick={() => { }}>
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
                    );
                })}
            </Grid>
            <Pagination
                count={totalPages}
                page={currentPage}
                onChange={(_event, page) => setCurrentPage(page)}
                shape="rounded"
                sx={{ mt: 3, display: 'flex', justifyContent: 'center' }}
            />
        </div>
    );
}

export default ProductListView;
