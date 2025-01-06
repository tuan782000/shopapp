import { configureStore } from '@reduxjs/toolkit';
import { authReducer } from './reducers/authReducer';
import { profileReducer } from './reducers/profileReducer';
import { cartReducer } from './reducers/cartReducer';

const store = configureStore({
    reducer: {
        authReducer,
        profileReducer,
        cartReducer
    }
});

export default store;

// redux giống useState dạng Global
