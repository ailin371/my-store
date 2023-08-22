import { Card, CardMedia, CardContent, Typography, IconButton, Grid, Box } from '@mui/material';
import React from 'react';
import CartItem from '../../models/CartItem';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteIcon from '@mui/icons-material/Delete';

export interface CartItemCardProps {
    cartItem: CartItem,
    onIncreaseQuantityClick: (cartItem: CartItem) => void,
    onDecreaseQuantityClick: (cartItem: CartItem) => void,
    onDeleteClick: (cartItem: CartItem) => void,
}

const CartItemCard: React.FC<CartItemCardProps> = ({ cartItem, onIncreaseQuantityClick: onIncreaseClick, onDecreaseQuantityClick: onDecreaseClick, onDeleteClick }) => {
    const increaseQuantity = () => onIncreaseClick(cartItem);
    const decreaseQuantity = () => onDecreaseClick(cartItem);
    const deleteItem = () => onDeleteClick(cartItem);

    return (
        <Card sx={{ width: '100%' }}>
            <Grid container>
                <Grid item xs={12} sm={3}>
                    <CardMedia // Product image
                        component="img"
                        height="140"
                        image={cartItem.product.imageUrl}
                    />
                </Grid>

                <Grid item xs={11} sm={8} container alignItems="center">
                    <CardContent>
                        <Typography variant="h5" component="div">
                            {cartItem.product.name}
                        </Typography>

                        <Typography variant="body2" color="text.secondary">
                            {cartItem.product.description}
                        </Typography>

                        <Typography variant="h6" component="div">
                            ${cartItem.product.price}
                        </Typography>

                        <Box display="flex" alignItems="center">
                            <IconButton aria-label="decrease quantity" onClick={decreaseQuantity} disabled={cartItem.quantity === 1}>
                                <RemoveIcon />
                            </IconButton>

                            <Typography variant="h6" component="div">
                                {cartItem.quantity}
                            </Typography>

                            <IconButton aria-label="increase quantity" onClick={increaseQuantity} disabled={cartItem.quantity === cartItem.product.stock}>
                                <AddIcon />
                            </IconButton>

                            <IconButton aria-label="delete" onClick={deleteItem} sx={{ display: { sm: 'none' } }}>
                                <DeleteIcon />
                            </IconButton>
                        </Box>
                    </CardContent>
                </Grid>

                <Grid
                    item
                    xs={1}
                    sx={{
                        display: {
                            xs: 'none',
                            sm: 'flex',
                        },
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                >
                    <IconButton aria-label="delete" onClick={deleteItem}>
                        <DeleteIcon />
                    </IconButton>
                </Grid>
            </Grid>
        </Card>
    );
};

export default CartItemCard;