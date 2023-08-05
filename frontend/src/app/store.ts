import { configureStore } from '@reduxjs/toolkit'

// redux-toolkit quick-start guide: https://redux-toolkit.js.org/tutorials/quick-start
export const store = configureStore({
    reducer: {},
});


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch