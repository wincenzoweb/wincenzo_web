import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import toast from "react-hot-toast";

import productService from "./productService";

export const getProducts = createAsyncThunk(
  "product/get-products",
  async (thunkAPI) => {
    try {
      return await productService.getProducts();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const getProduct = createAsyncThunk(
  "product/get-product",
  async (data, thunkAPI) => {
    try {
      return await productService.getProduct(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const getCategory = createAsyncThunk(
  "product/get-category",
  async (thunkAPI) => {
    try {
      return await productService.getCategories();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const ProductFilter = createAsyncThunk(
  "product/filter",
  async (data, thunkAPI) => {
    try {
      return await productService.ProductFilter(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const addReview = createAsyncThunk(
  "review/add-review",
  async (data, thunkAPI) => {
    try {
      return await productService.addReview(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
)

export const productSlice = createSlice({
  name: "product",
  initialState: {
    isLoading: false,
    product: {},
    products: [],
    category: [],
  },
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.isLoading = null;
        state.products = action.payload?.products;
        state.totalProducts = action.payload?.totalProducts;
        state.productFilter = action.payload;

      })
      .addCase(getProducts.rejected, (state, action) => {
        state.isLoading = false;
        toast.error(action.payload?.response?.data?.message);
      })
      .addCase(ProductFilter.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(ProductFilter.fulfilled, (state, action) => {
        state.isLoading = null;
        state.products = action.payload?.product;
        state.productFilter = action.payload;
      })
      .addCase(ProductFilter.rejected, (state, action) => {
        state.isLoading = false;
        toast.error(action.payload?.response?.data?.message);
      })
      .addCase(getProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        console.log("1",action.payload)
        state.product = action.payload;
      })
      .addCase(getProduct.rejected, (state, action) => {
        state.isLoading = false;
        toast.error(action.payload?.response?.data?.message);
      })
      .addCase(getCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.category = action.payload.categories;
      })
      .addCase(getCategory.rejected, (state, action) => {
        state.isLoading = false;
        toast.error(action.payload?.response?.data?.message);
      })
      .addCase(addReview.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addReview.fulfilled, (state, action) => {
        state.isLoading = false;
        console.log("2",action.payload)
        state.product = action.payload.product
        toast.success(action.payload.message);
      })
      .addCase(addReview.rejected, (state, action) => {
        state.isLoading = false;
        toast.error(action.payload?.response?.data?.message);
      });

  },
});

export default productSlice.reducer;
