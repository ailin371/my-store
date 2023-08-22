import React, { useState } from 'react';
import { Card, CardContent, CardMedia, Typography, Grid, Pagination } from '@mui/material';
import Product from '../../models/Product';
import MultiSelectDropdown from './Dropdown';

export interface ProductListViewProps {
    products: Product[],
    onProductClick: (product: Product) => void,
    itemsPerPage?: number,
}

const ProductListView: React.FC<ProductListViewProps> = ({ products, onProductClick, itemsPerPage = 6 }) => {
    const [categories, setCategories] = useState<string[]>([])
    const filteredProducts = categories.length > 0 ? products.filter(product => categories.includes(product.category)) : products;

    const [currentPage, setCurrentPage] = useState<number>(1);
    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
    const currentProducts = filteredProducts.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    const placeholdersCount = itemsPerPage - currentProducts.length;
    const placeholders = Array.from({ length: placeholdersCount }).map(() => ({}));

    if (filteredProducts.length === 0) {
        return <>Oops, no items</>
    }

    return (
        <Grid container sx={{ py: 2, rowGap: 2 }}>
            <Grid item xs={12}>
                <MultiSelectDropdown
                    label='Select Categories'
                    options={[...new Set(products.map(p => p.category))]}
                    onSelect={(selectedCategories) => {
                        setCategories(selectedCategories)
                        setCurrentPage(1);
                    }}
                />
            </Grid>
            <Grid item container xs={12} spacing={3}>
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
            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
                <Pagination
                    count={totalPages}
                    page={currentPage}
                    onChange={(_event, page) => setCurrentPage(page)}
                    shape="rounded"
                />
            </Grid>
        </Grid>
    );
}

export default ProductListView;
