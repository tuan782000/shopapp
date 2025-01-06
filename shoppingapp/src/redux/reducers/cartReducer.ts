import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        data: []
    },
    reducers: {
        syncData: (state, action) => {
            state.data = action.payload;
        },
        addCart: (state, action) => {
            const items: any = state.data;
            const item = action.payload;
            const index = items.findIndex(
                (element: any) => element.selectedSizes === item.selectedSizes
            );

            if (index !== -1) {
                items[index] = item;
            } else {
                items.push(item);
            }
            state.data = items;
        },
        removeCart: (state, action) => {
            const items: any = state.data;
            const { id, selectedSizes } = action.payload;
            const index = items.findIndex(
                (element: any) =>
                    element.selectedSizes === selectedSizes &&
                    element._id === id
            );

            if (index !== -1) {
                items.splice(index, 1);
            }

            state.data = items;
        },
        updateQuantity: (state, action) => {
            const items: any = state.data;
            const { id, selectedSizes, number } = action.payload;
            const index = items.findIndex(
                (element: any) =>
                    element.selectedSizes === selectedSizes &&
                    element._id === id
            );

            if (index !== -1) {
                items[index].numberProduct += number;
            }

            state.data = items;
        }
    }
});

export const cartReducer = cartSlice.reducer;

export const { addCart, removeCart, updateQuantity, syncData } =
    cartSlice.actions;

export const cartSelector = (state: any) => state.cartReducer.data;
