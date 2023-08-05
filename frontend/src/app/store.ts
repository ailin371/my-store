import { configureStore } from '@reduxjs/toolkit'
import userReducer from './features/user/userSlice';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

// redux-toolkit quick-start guide: https://redux-toolkit.js.org/tutorials/quick-start
export const store = configureStore({
    reducer: {
        user: userReducer
    },
});


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;