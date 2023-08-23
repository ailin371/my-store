import React, { useState } from 'react';
import { Alert, Box, Button, Divider, List, ListItem, Snackbar, Typography } from '@mui/material';
import { useCheckoutMutation, useGetCartQuery, useRemoveCartItemMutation, useUpdateCartItemMutation } from '../../app/api';
import Cart from '../../models/Cart';
import CartItemCard from '../view/CartItemCard';
import CartItem from '../../models/CartItem';
import YesNoDialog from '../view/YesNoDialog';
import ShoppingCartCheckoutOutlinedIcon from '@mui/icons-material/ShoppingCartCheckoutOutlined';


const ConnectedCart: React.FC = () => {
    const { data: cart = {} as Cart } = useGetCartQuery();
    const [updateCartItem] = useUpdateCartItemMutation();
    const [removeCartItem] = useRemoveCartItemMutation();
    const [checkout] = useCheckoutMutation();
    const { items: cartItems = [], totalPrice = 0 } = cart;
    const [openDialog, setOpenDialog] = useState(false);
    const [itemToDelete, setItemToDelete] = useState<CartItem | null>(null);
    const [openCheckoutSuccess, setOpenCheckoutSuccess] = useState(false);

    const handleIncreaseQuantity = (cartItem: CartItem) => {
        updateCartItem({ id: cartItem.id, updates: { quantity: cartItem.quantity + 1 } })
    };

    const handleDecreaseQuantity = (cartItem: CartItem) => {
        updateCartItem({ id: cartItem.id, updates: { quantity: cartItem.quantity - 1 } })
    };

    const handleDeleteItem = (cartItem: CartItem) => {
        console.log(cartItem)
        removeCartItem(cartItem.id);
    };

    const handleCheckout = () => {
        checkout().unwrap()
            .then(() => {
                setOpenCheckoutSuccess(true);
            })
            .catch((error) => {
                // handle error
                console.error('Failed to checkout:', error)
            });
    };

    return (
        <Box sx={{ p: 2 }}>
            <Typography variant="h4">Your Cart</Typography>
            <Divider />
            <List>
                {cartItems.map(item => (
                    <ListItem key={item.id}>
                        <CartItemCard
                            cartItem={item}
                            onIncreaseQuantityClick={handleIncreaseQuantity}
                            onDecreaseQuantityClick={handleDecreaseQuantity}
                            onDeleteClick={() => {
                                setOpenDialog(true);
                                setItemToDelete(item);
                            }}
                        />
                    </ListItem>
                ))}
                {cartItems.length === 0 && <Typography>It's so empty here...</Typography>}
            </List>

            <Box sx={{
                position: 'fixed',
                bottom: 0,
                left: 0,
                width: '100%',
                background: '#fff',
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '10px 20px',
                borderTop: '1px solid #ddd'
            }}>
                <Typography variant="h6" sx={{ mr: 2 }}>Total: ${totalPrice}</Typography>
                <Button variant="contained" color="primary" onClick={handleCheckout}>
                    <ShoppingCartCheckoutOutlinedIcon sx={{ mr: 1 }} />
                    Checkout
                </Button>
            </Box>

            <YesNoDialog
                open={openDialog}
                message='Are you sure you want to delete the item from the cart?'
                onYesClick={() => {
                    if (itemToDelete) {
                        handleDeleteItem(itemToDelete);
                    }

                    setOpenDialog(false);
                    setItemToDelete(null);
                }}
                onNoClick={() => {
                    setOpenDialog(false);
                }}
            />
            <Snackbar
                open={openCheckoutSuccess}
                autoHideDuration={3000}
                onClose={() => setOpenCheckoutSuccess(false)}
            >
                <Alert severity="success">Checked-out successfully!</Alert>
            </Snackbar>
        </Box>
    );
};

export default ConnectedCart;
