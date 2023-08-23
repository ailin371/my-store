import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Cart from '../../../models/Cart';
import Product from '../../../models/Product';
import { RootState } from '../../store';

const initialState: Cart = {
    items: [],
    totalQuantity: 0,
    totalPrice: 0,
    id: -1,
    user: -1
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<Product>) => {
            const newProduct = action.payload;
            const existingItem = state.items.filter(item => item.product.id === newProduct.id)[0];
            if (existingItem) {
                existingItem.quantity++;
            } else {
                state.items[newProduct.id].product = newProduct;
                state.items[newProduct.id].quantity = 1;
            }
            state.totalQuantity++;
        },
        removeFromCart: (state, action: PayloadAction<{ productId: number }>) => {
            const { productId } = action.payload;
            const existingItem = state.items.filter(item => item.product.id === productId)[0];
            if (existingItem && existingItem.quantity > 1) {
                existingItem.quantity--;
            } else {
                state.items = state.items.filter(item => item.product.id !== productId);
            }
            state.totalQuantity--;
        },
        clearCart: state => {
            state.items = [];
            state.totalQuantity = 0;
        },
    },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;

export const selectCartItems = (state: RootState) => state.cart.items;
export const selectTotalQuantity = (state: RootState) => state.cart.totalQuantity;

const cartReducer = cartSlice.reducer;
export default cartReducer;