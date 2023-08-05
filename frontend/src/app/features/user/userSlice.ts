import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
    email: string,
    firstName: string,
    lastName: string,
}

const initialState: UserState = {
    email: '',
    firstName: '',
    lastName: '',
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