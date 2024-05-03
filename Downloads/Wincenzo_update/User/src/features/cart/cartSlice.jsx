import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import toast from "react-hot-toast";

import cartService from "./cartService";

export const getCart = createAsyncThunk(
  "cart/get-cart",
  async (data, thunkAPI) => {
    try {
      return await cartService.getCart(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const editCart = createAsyncThunk(
  "cart/update-cart",
  async (data, thunkAPI) => {
    console.log(data);
    try {
      return await cartService.updateCart(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const deleteCartItem = createAsyncThunk(
  "cart/delete-cart-item",
  async (data, thunkAPI) => {
    try {
      return await cartService.deleteCartItem(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const deleteCartAllItem = createAsyncThunk(
  "cart/delete-cart-allitem",
  async (data, thunkAPI) => {
    try {
      return await cartService.deleteCartAllItem(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const addCart = createAsyncThunk(
  "cart/add-cart",
  async (data, thunkAPI) => {
    try {
      return await cartService.addCart(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    isLoading: false,
    cart: [],
    cartTotal: 0,
  },
  reducers: {
    
  },

  extraReducers: (builder) => {
    builder
      .addCase(getCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cart = action.payload?.cartItems;
        state.totalCartProducts = action.payload?.totalCartProducts;
        state.cartTotal = action.payload?.cartTotal;
      })
      .addCase(getCart.rejected, (state, action) => {
        state.isLoading = false;
        toast.error(action.payload?.response?.data?.message);
      })

      .addCase(deleteCartItem.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteCartItem.fulfilled, (state, action) => {
        state.isLoading = false;
        toast.success(action.payload.message);
      })
      .addCase(deleteCartItem.rejected, (state, action) => {
        state.isLoading = false;
        toast.error(action.payload?.response?.data?.message);
      })
      .addCase(deleteCartAllItem.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteCartAllItem.fulfilled, (state, action) => {
        state.isLoading = false;
        toast.success(action.payload.message);
      })
      .addCase(deleteCartAllItem.rejected, (state, action) => {
        state.isLoading = false;
        toast.error(action.payload?.response?.data?.message);
      })
      .addCase(editCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(editCart.fulfilled, (state, action) => {
        state.isLoading = false;
        toast.success(action.payload?.message);
      })
      .addCase(editCart.rejected, (state, action) => {
        state.isLoading = false;
        toast.error(action.payload?.response?.data?.message);
      })
      .addCase(addCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addCart.fulfilled, (state, action) => {
        state.isLoading = false;
        toast.success(action.payload.message);
      })
      .addCase(addCart.rejected, (state, action) => {
        state.isLoading = false;
        toast.error(action.payload?.response?.data?.message);
      });
  },
});
export const { clearCart } = cartSlice.actions;
export default cartSlice.reducer;
