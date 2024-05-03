import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { toast } from "react-toastify";
import orderService from "./orderService";

export const getOrders = createAsyncThunk("order/get-orders", async (thunkAPI) => {
  try {
    return await orderService.getorders();
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const addOrder = createAsyncThunk(
  "product/add-order",
  async (data, thunkAPI) => {
    try {
      return await orderService.Addorder(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const editOrder = createAsyncThunk(
  "order/edit-order",
  async (data, thunkAPI) => {
    try {
      return await orderService.Editorder(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const deleteOrder = createAsyncThunk(
  "order/delete-order",
  async (data, thunkAPI) => {
    try {
      return await orderService.Delorder(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const getOrdersByUser = createAsyncThunk(
  "order/get-order",
  async (data, thunkAPI) => {
    try {
      return await orderService.getordersByUserid(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const orderSlice = createSlice({
  name: "order",
  initialState: {
    orders: [],
    addModal: false,
    editModal: false,
    isLoading: false,
    orderDetail: {},
    userOrder: {},
    detailModal: false,
    editItem: {},
    printInvoice: false,
  },
  reducers: {
    // open add modal
    openAddModal: (state, action) => {
      state.addModal = action.payload;
    },
    toggleDetailModal: (state, action) => {
      state.detailModal = !state.detailModal;
      state.orderDetail = action.payload;
    },

    updateOrder: (state, action) => {
      state.editModal = !state.editModal;
      state.editItem = action.payload;
    },

    closeEditModal: (state, action) => {
      state.editModal = action.payload;
    },
    closeDetailModal: (state, action) => {
      state.detailModal = action.payload;
    },
    printInvoice: (state, action) => {
      state.printInvoice = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getOrders.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOrders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orders = action.payload?.orders;
        state.totalOrders = action.payload?.totalOrders;
      })
      .addCase(getOrders.rejected, (state, action) => {
        state.isLoading = false;

        toast.error(action.payload?.response?.data?.message);
      })
      .addCase(getOrdersByUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOrdersByUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userOrder = action.payload?.orders;
      })
      .addCase(getOrdersByUser.rejected, (state, action) => {
        state.isLoading = false;

        toast.error(action.payload?.response?.data?.message);
      })
      .addCase(addOrder.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addOrder.fulfilled, (state, action) => {
        state.isLoading = false;

        toast.success(action.payload.message);
      })
      .addCase(addOrder.rejected, (state, action) => {
        state.isLoading = false;
        toast.error(action.payload?.response?.data?.message);
      })
      .addCase(deleteOrder.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteOrder.fulfilled, (state, action) => {
        state.isLoading = false;

        toast.success(action.payload.message);
      })
      .addCase(deleteOrder.rejected, (state, action) => {
        state.isLoading = false;
        toast.error(action.payload?.response?.data?.message);
      })
      .addCase(editOrder.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(editOrder.fulfilled, (state, action) => {
        state.isLoading = false;

        state.editItem = {};
        toast.success(action.payload.message);
      })
      .addCase(editOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.editItem = {};
        toast.error(action.payload?.response?.data?.message);
      });
  },
});

export const {
  openAddModal,
  updateOrder,
  closeEditModal,
  toggleDetailModal,
  closeDetailModal,
  printInvoice
} = orderSlice.actions;
export default orderSlice.reducer;
