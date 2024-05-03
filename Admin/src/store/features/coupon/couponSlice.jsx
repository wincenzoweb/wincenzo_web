import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import couponService from "./CouponService";
import { toast } from "react-toastify";




export const getCoupons = createAsyncThunk(
    "coupon/get-coupons",
    async (data, thunkAPI) => {
        try {
            return await couponService.getCoupons(data);
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    });

export const addCoupon = createAsyncThunk(
    "coupon/add-coupons",
    async (data, thunkAPI) => {
        try {
            return await couponService.addCoupon(data);
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    });

export const editCoupon = createAsyncThunk(
    "coupon/edit-coupons",
    async (data, thunkAPI) => {
        try {
            return await couponService.editCoupon(data);
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    });

export const deleteCoupon = createAsyncThunk(
    "coupon/delete-coupons",
    async (data, thunkAPI) => {
        try {
            return await couponService.deleteCoupon(data);
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    });


export const couponSlice = createSlice({
    name: "coupon",
    initialState: {
        coupons: [],
        addModal: false,
        isLoading: null,
        editItem: {},
        editModal: false,
    },
    reducers: {
        openAddModal: (state, action) => {
            state.addModal = action.payload;
        },
        toggleEditModal: (state, action) => {
            state.editModal = action.payload;
            state.editItem = {};
        },
        updateData: (state, action) => {
            state.editItem = action.payload;
            state.editModal = !state.editModal;
        },
    },
    extraReducers: (builder) => {
        builder

            .addCase(getCoupons.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getCoupons.fulfilled, (state, action) => {
                state.isLoading = false;
                state.coupons = action.payload?.coupons;
            })
            .addCase(getCoupons.rejected, (state, action) => {
                state.isLoading = false;
                toast.error(action.payload?.response?.data?.message);
            })
            .addCase(addCoupon.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(addCoupon.fulfilled, (state, action) => {
                state.isLoading = false;
                toast.success(action.payload.message);
            })
            .addCase(addCoupon.rejected, (state, action) => {
                state.isLoading = false;
                toast.error(action.payload?.response?.data?.message);
            })

    }
});

export const {
    openAddModal,
    toggleEditModal,
    updateData,

} = couponSlice.actions;
export default couponSlice.reducer;