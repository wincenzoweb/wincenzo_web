import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

import { toast } from "react-toastify";
import avatar1 from "@/assets/images/avatar/av-1.svg";
import avatar2 from "@/assets/images/avatar/av-2.svg";
import avatar3 from "@/assets/images/avatar/av-3.svg";
import avatar4 from "@/assets/images/avatar/av-4.svg";
import userService from "./userService";

export const getUsers = createAsyncThunk("user/get-users", async (data,thunkAPI) => {
  try {
    return await userService.getUsers(data);
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});
export const addUser = createAsyncThunk(
  "user/add-user",
  async (data, thunkAPI) => {
    try {
      return await userService.addUser(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const deleteUser = createAsyncThunk(
  "user/delete-user",
  async (data, thunkAPI) => {
    try {
      return await userService.deleteUser(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const editUser = createAsyncThunk(
  "user/update-user",
  async (data, thunkAPI) => {
    try {
      return await userService.updateUser(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const getDeliveryboy = createAsyncThunk(
  "user/get-deliveryboy",
  async (thunkAPI) => {
    try {
      return await userService.getDeliveryboy();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const addDeliveryboy = createAsyncThunk(
  "user/add-deliveryboy",
  async (data, thunkAPI) => {
    try {
      return await userService.addDeliveryboy(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const addAdmin = createAsyncThunk(
  "user/add-admin",
  async (data, thunkAPI) => {
    try {
      return await userService.addAdmin(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const addInitAdmin = createAsyncThunk(
  "user/add-admin-init",
  async (data, thunkAPI) => {
    try {
      return await userService.addInitAdmin(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState: {
    users: [],
    deliveryboys: [],
    addModal: false,
    isLoading: null,
    editItem: {},
    detailItem: {},
    editModal: false,
    detailModal: false,
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
    toggleDetailModal: (state, action) => {
      state.detailItem = action.payload;
      state.detailModal = !state.editModal;
    },
    closeDetailModal: (state, action) => {
      state.detailModal = action.payload;
      state.detailItem ={}
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(getDeliveryboy.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getDeliveryboy.fulfilled, (state, action) => {
        state.isLoading = false;
        state.deliveryboys = action.payload?.users;
        state.totaldeliveryboys = action.payload?.totalUsers;
      })
      .addCase(getDeliveryboy.rejected, (state, action) => {
        state.isLoading = false;
        toast.error(action.payload?.response?.data?.message);
      })
      .addCase(addDeliveryboy.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addDeliveryboy.fulfilled, (state, action) => {
        state.isLoading = false;
        toast.success(action.payload.message);
      })
      .addCase(addDeliveryboy.rejected, (state, action) => {
        state.isLoading = false;
        toast.error(action.payload?.response?.data?.message);
      })
      .addCase(getUsers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.isLoading = null;
        state.users = action.payload?.users;
        state.totalUsers = action.payload?.totalUsers;
      })
      .addCase(getUsers.rejected, (state, action) => {
        state.isLoading = false;
        toast.error(action.payload?.response?.data?.message);
      })
      .addCase(addUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.newUser = action.payload?.user;
        toast.success(action.payload?.message);
      })
      .addCase(addUser.rejected, (state, action) => {
        state.isLoading = false;
        toast.error(action.payload?.response?.data?.message);
      })

      .addCase(deleteUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.isLoading = null;

        toast.success(action.payload.message);
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.isLoading = false;
        toast.error(action.payload?.response?.data?.message);
      })
      .addCase(editUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(editUser.fulfilled, (state, action) => {
        state.isLoading = false;

        state.editItem = {};
        toast.success(action.payload.message);
      })
      .addCase(editUser.rejected, (state, action) => {
        state.isLoading = false;
        state.editItem = {};
        toast.error(action.payload?.response?.data?.message);
      })
      .addCase(addAdmin.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addAdmin.fulfilled, (state, action) => {
        state.isLoading = false;

        toast.success(action.payload.message);
      })
      .addCase(addAdmin.rejected, (state, action) => {
        state.isLoading = false;
        toast.error(action.payload?.response?.data?.message);
      })
      .addCase(addInitAdmin.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addInitAdmin.fulfilled, (state, action) => {
        state.isLoading = false;

        toast.success(action.payload.message);
      })
      .addCase(addInitAdmin.rejected, (state, action) => {
        state.isLoading = false;
        toast.error(action.payload?.response?.data?.message);
      });
  },
});

export const {
  openAddModal,
  toggleEditModal,
  updateData,
  toggleDetailModal,
  closeDetailModal,
} = userSlice.actions;
export default userSlice.reducer;
