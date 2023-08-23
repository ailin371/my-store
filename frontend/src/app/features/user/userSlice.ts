import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserLoginResponse } from '../../models';

export type UserState = UserLoginResponse;

const initialState: UserState = {
    username: '',
    email: '',
    firstName: '',
    lastName: '',
    id: -1,
    token: '',
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (_state: UserState, action: PayloadAction<UserState>) => {
            const user = action.payload;
            const userString = JSON.stringify(user);
            sessionStorage.setItem("user", userString);

            return user;
        },
        clearUser: () => {
            sessionStorage.removeItem("user");

            return initialState;
        },
    },
});

export const { setUser, clearUser } = userSlice.actions;

const userReducer = userSlice.reducer;
export default userReducer;