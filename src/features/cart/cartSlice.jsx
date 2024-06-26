import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


// console.log(cartItems);

const url = "https://raw.githubusercontent.com/mrfrunze/redux-toolkit-tutorial/main/data/react-useReducer-cart-project.json";

const initialState = {
    cartItems: [],
    amount: 0,
    total: 0,
    isLoading: true,
}

export const getCartItems = createAsyncThunk(
    "cart/getCartItems", 
    async (name, thunkAPI) => {
    try {
        // console.log(thunkAPI);
    //   console.log(thunkAPI.getState());
      // thunkAPI.dispatch(openModal());
        const response = await axios(url)
        return response.data
    } catch (error) {
        return thunkAPI.rejectWithValue('something went wrong')
    }
})

const cartSlice = createSlice( {
   name: 'cart',
   initialState,
   reducers: {
    clearCart: (state) => {
        state.cartItems = []
        // return {cartItems: []}
    },
    removeItem: (state, action) => {
        const itemId = action.payload
        state.cartItems = state.cartItems.filter(item => item.id !== itemId)
    },
    increase: (state, { payload }) => {
        const cartItem = state.cartItems.find(item => item.id === payload.id)
        cartItem.amount = cartItem.amount + 1
    },
    decrease:  (state, { payload }) => {
        const cartItem = state.cartItems.find(item => item.id === payload.id)
        cartItem.amount = cartItem.amount - 1
    },
    calculateTotals: state => {
        let amount = 0;
        let total = 0;
        state.cartItems.forEach(item => {
            amount += item.amount;
            total += item.amount * item.price;
        })
        state.amount = amount;
        state.total = total;
    }
   },
   extraReducers: (builder) => {
    builder.addCase(getCartItems.pending, (state) => {
        state.isLoading = true
    })
    .addCase(getCartItems.fulfilled, (state, action) => {
        state.isLoading = false
        state.cartItems = action.payload
    })
    .addCase(getCartItems.rejected, (state) => {
        state.isLoading = false
    })
   }
})

// console.log(cartSlice);

export const {clearCart, removeItem, increase, decrease, calculateTotals} = cartSlice.actions

export default cartSlice.reducer