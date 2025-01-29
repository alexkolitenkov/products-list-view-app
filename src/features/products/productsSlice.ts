import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import type { IProduct } from '../../types/common';

interface ProductState {
    products: IProduct[];
}

const initialState: ProductState = {
    products: [],
};

export const productsSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        addProduct: (state, action: PayloadAction<IProduct>) => {
            state.products.push(action.payload);
        },
        removeProduct: (state, action: PayloadAction<number>) => {
            state.products = state.products.filter(product => product.id !== action.payload);
        },
        editProduct: (state, action: PayloadAction<IProduct>) => {
            const index = state.products.findIndex(product => product.id === action.payload.id);
            if (index !== -1) {
                state.products[index] = action.payload;
            }
        },
        setProducts: (state, action: PayloadAction<IProduct[]>) => {
            state.products = action.payload;
        }
    },
});

export const { addProduct, removeProduct, editProduct, setProducts } = productsSlice.actions;
