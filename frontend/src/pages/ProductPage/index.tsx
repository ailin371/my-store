import React, { useEffect, useMemo, useState } from 'react';
import { Button, Typography, Grid, Select, MenuItem, Rating, TextField, SxProps, FormControl, InputLabel, Divider } from '@mui/material';
import Product from '../../models/Product';
import { useNavigate, useParams } from 'react-router-dom';
import { MOCK_PRODUCTS } from '../../mock/mockProducts';
import SpinnerWithBackdrop from '../../components/view/SpinnerWithBackdrop';
import ConnectedUserReviews from '../../components/connected/ConnectedUserReviews';
import Review from '../../models/Review';


const ProductPage: React.FC = () => {
    const navigate = useNavigate();
    const { productId } = useParams<{ productId: string }>();
    const [product, setProduct] = useState<Product | null>(null);
    const [quantity, setQuantity] = useState<number>(1);
    const reviews: Review[] = []; // TODO: wire to real data

    const hasPurchasedProduct = useMemo(() => {
        if (!product) return false;

        return MOCK_PRODUCTS.some(mockProduct => mockProduct.id.toString() === productId);
    }, [productId, product]);

    useEffect(() => {
        // TODO: make an actual API call
        const fetchedProduct = MOCK_PRODUCTS.find(p => p.id.toString() === productId);

        if (!fetchedProduct) navigate('/page-not-found');

        setProduct(fetchedProduct ?? null);
    }, [productId, navigate]);

    if (!product) return <SpinnerWithBackdrop open={true} />;

    const isProductInStock = product.stock > 0;

    const handleAddToCart = () => {
        // TODO: Handle add to cart
    };

    return (
        <Grid container spacing={3} sx={{ p: 2 }}>
            <Grid item xs={12} sm={6} container>
                <img src={product.imageUrl} alt={product.name} style={{ width: '100%' }} />
            </Grid>
            <Grid item xs={12} sm={6} container direction="column">
                <Typography variant="h4">{product.name}</Typography>
                <Typography variant="h6">${product.price.toFixed(2)}</Typography>
                <Typography variant="body1" sx={{ mb: 2 }}>{product.description}</Typography>

                {isProductInStock ? (
                    <Typography variant="body2" sx={{ color: 'green' }}>
                        In Stock
                    </Typography>
                ) : (
                    <Typography variant="body2" sx={{ color: 'red' }}>
                        Out of Stock
                    </Typography>
                )}

                <FormControl variant="outlined" fullWidth sx={{ mt: 1 }}>
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
                        {[1, 2, 3, 4, 5].map(num => (
                            <MenuItem key={num} value={num}>{num}</MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <Button variant="contained" onClick={handleAddToCart} disabled={!isProductInStock} sx={{ mt: 1 }}>
                    Add to Cart
                </Button>
            </Grid>

            <Grid item xs={12}>
                <Divider />
            </Grid>

            <Grid item xs={12} sm={6} container>
                <ConnectedUserReviews
                    productId={Number(productId)}
                    hasPurchasedProduct={hasPurchasedProduct}
                    initialReviews={reviews}
                    sx={{ width: '100%' }}
                />
            </Grid>
        </Grid>
    );
};

export default ProductPage;