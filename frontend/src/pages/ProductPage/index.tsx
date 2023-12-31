import React, { useEffect, useState } from 'react';
import { Button, Typography, Grid, Select, MenuItem, FormControl, InputLabel, Divider, Box, Rating, Alert, Snackbar } from '@mui/material';
import Product from '../../models/Product';
import { useNavigate, useParams } from 'react-router-dom';
import SpinnerWithBackdrop from '../../components/view/SpinnerWithBackdrop';
import ConnectedUserReviews from '../../components/connected/ConnectedUserReviews';
import { useAddItemToCartMutation, useLazyGetProductQuery } from '../../app/api';


const ProductPage: React.FC = () => {
    const navigate = useNavigate();
    const [fetchProduct] = useLazyGetProductQuery();
    const [addItemToCart] = useAddItemToCartMutation();
    const { productId } = useParams<{ productId: string }>();
    const [product, setProduct] = useState<Product | null>(null);
    const [quantity, setQuantity] = useState<number>(1);
    const [openAddedToCartSuccess, setOpenAddedToCartSuccess] = useState<boolean | null>(null);

    useEffect(() => {
        if (!productId) return navigate('/page-not-found');

        fetchProduct({ id: productId })
            .unwrap()
            .then((data) => setProduct(data))
            .catch(() => navigate('/page-not-found'));

    }, [productId, navigate, fetchProduct]);

    if (!productId || !product) return <SpinnerWithBackdrop open={true} />;

    const isProductInStock = product.stock > 0;

    // Generate the array of selectable quantities based on the available stock
    const maxQuantity = Math.min(product.stock, 5);
    const selectableQuantities = Array.from({ length: maxQuantity }, (_, i) => i + 1);

    const handleAddToCart = () => {
        addItemToCart({ product, quantity })
            .unwrap()
            .then(() => {
                setOpenAddedToCartSuccess(true);
            })
            .catch(() => {
                setOpenAddedToCartSuccess(false)
            });
    };

    return (
        <Box sx={{ p: 2 }}>
            <Grid container sx={{ rowGap: 2 }}>
                <Grid item container sx={{ columnGap: 2, justifyContent: 'center', alignItems: 'center' }}>
                    <Grid item xs={12} sm={4}>
                        <img src={product.imageUrl} alt={product.name} style={{ width: '100%', height: '100%' }} />
                    </Grid>
                    <Grid item xs={12} sm={'auto'}>
                        <Typography variant="h4">{product.name}</Typography>
                        <Typography variant="h6">${product.price.toFixed(2)}</Typography>
                        <Typography variant="body1">{product.description}</Typography>
                        <Rating value={product.averageRating} readOnly sx={{ mb: 2 }} />

                        {isProductInStock ? (
                            <Typography variant="body2" sx={{ color: 'green' }}>
                                In Stock
                            </Typography>
                        ) : (
                            <Typography variant="body2" sx={{ color: 'red' }}>
                                Out of Stock
                            </Typography>
                        )}

                        <Grid container sx={{ mt: 1, gap: 1 }}>
                            <Grid item xs={12} sm={'auto'}>
                                <FormControl variant="outlined" sx={{ minWidth: 70 }}>
                                    <InputLabel id="quantity-label" htmlFor="outlined-quantity">Quantity</InputLabel>
                                    <Select
                                        labelId="quantity-label"
                                        id="outlined-quantity"
                                        value={quantity}
                                        onChange={(e) => setQuantity(e.target.value as number)}
                                        label="Quantity"
                                        variant="outlined"
                                        disabled={!isProductInStock}
                                    >
                                        {selectableQuantities.map(num => (
                                            <MenuItem key={num} value={num}>{num}</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>

                            <Grid item xs={12} sm={'auto'}>
                                <Button variant="contained" onClick={handleAddToCart} disabled={!isProductInStock} sx={{ height: '100%', width: '100%' }}>
                                    Add to Cart
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>

                <Grid item xs={12}>
                    <Divider />
                </Grid>

                <Grid item container sx={{ justifyContent: 'center' }}>
                    <Grid item xs={12} sm={6}>
                        <ConnectedUserReviews
                            productId={Number(productId)}
                            sx={{ width: '100%' }}
                        />
                    </Grid>
                </Grid>
            </Grid>

            <Snackbar
                open={openAddedToCartSuccess === true}
                autoHideDuration={3000}
                onClose={() => setOpenAddedToCartSuccess(null)}
            >
                <Alert severity="success">Item added to cart successfully!</Alert>
            </Snackbar>
            <Snackbar
                open={openAddedToCartSuccess === false}
                autoHideDuration={3000}
                onClose={() => setOpenAddedToCartSuccess(null)}
            >
                <Alert severity="error">Failed to add the item to the cart. Please try again later...</Alert>
            </Snackbar>
        </Box>
    );
};

export default ProductPage;