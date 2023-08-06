import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserLoginResponse } from '../../models';

export type UserState = UserLoginResponse;

const initialState: UserState = {
    username: '',
    email: '',
    firstName: '',
    lastName: '',
    userId: -1,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (_state: UserState, action: PayloadAction<UserState>) => {
            return action.payload;
        },
        clearUser: () => {
            return initialState;
        },
    },
});

export const { setUser, clearUser } = userSlice.actions;

const userReducer = userSlice.reducer;
export default userReducer;