import React, { useState } from 'react';
import { Box, Divider, List, ListItem, Typography } from '@mui/material';
import { useGetCartQuery, useRemoveCartItemMutation, useUpdateCartItemMutation } from '../../app/api';
import Cart from '../../models/Cart';
import CartItemCard from '../view/CartItemCard';
import CartItem from '../../models/CartItem';
import YesNoDialog from '../view/YesNoDialog';

const ConnectedCart: React.FC = () => {
    const { data: cart = {} as Cart } = useGetCartQuery();
    const [updateCartItem] = useUpdateCartItemMutation();
    const [removeCartItem] = useRemoveCartItemMutation();
    const { items: cartItems = [], totalPrice = 0 } = cart;
    const [openDialog, setOpenDialog] = useState(false);

    const handleIncreaseQuantity = (cartItem: CartItem) => {
        updateCartItem({ id: cartItem.id, updates: { quantity: cartItem.quantity + 1 } })
    };

    const handleDecreaseQuantity = (cartItem: CartItem) => {
        updateCartItem({ id: cartItem.id, updates: { quantity: cartItem.quantity - 1 } })
    };

    const handleDeleteItem = (cartItem: CartItem) => {
        removeCartItem(cartItem.id);
    };

    return (
        <Box sx={{ p: 2 }}>
            <Typography variant="h4">Your Cart</Typography>
            <Divider />
            <List>
                {cartItems.map(item => (
                    <ListItem key={item.product.id}>
                        <CartItemCard
                            cartItem={item}
                            onIncreaseQuantityClick={handleIncreaseQuantity}
                            onDecreaseQuantityClick={handleDecreaseQuantity}
                            onDeleteClick={() => setOpenDialog(true)}
                        />
                        <YesNoDialog
                            open={openDialog}
                            message='Are you sure you want to delete the item from the cart?'
                            onYesClick={() => {
                                setOpenDialog(false);
                                handleDeleteItem(item);
                            }}
                            onNoClick={() => {
                                setOpenDialog(false);
                            }}
                        />
                    </ListItem>
                ))}
                {cartItems.length === 0 && <Typography>It's so empty here...</Typography>}
            </List>
            <Typography variant="h6">Total: ${totalPrice}</Typography>
        </Box>
    );
};

export default ConnectedCart;
