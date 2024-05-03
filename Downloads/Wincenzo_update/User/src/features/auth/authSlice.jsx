import {  createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import authService from "./authService";
import toast from "react-hot-toast";
// import { toast } from "react-toastify";

const getUserLocalStorage = window.localStorage.getItem("USER")
  ? JSON.parse(window.localStorage.getItem("USER"))
  : null;

const initialState = {
  user: getUserLocalStorage,
  orders: [],
  wishlist: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
  registerUser: {},
};

export const login = createAsyncThunk(
  "auth/user-login",
  async (data, thunkAPI) => {
    try {
      return await authService.login(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const register = createAsyncThunk(
  "auth/user-register",
  async (user, thunkAPI) => {
    try {
      return await authService.reg(user);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const editUser = createAsyncThunk(
  "auth/user-update",
  async (data, thunkAPI) => {
    try {
      return await authService.updateUser(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const forgotPassword = createAsyncThunk(
  "auth/user-forgot-password",
  async (data, thunkAPI) => {
    try {
      return await authService.forgotPass(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const forgotPasswordVerify = createAsyncThunk(
  "auth/user-forgot-password-verify",
  async (data, thunkAPI) => {
    try {
      return await authService.forgotPassVerify(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const allOrders = createAsyncThunk(
  "order/get-user-orders",
  async (data, thunkAPI) => {
    try {
      return await authService.allOrders(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const addOrders = createAsyncThunk(
  "order/add-user-orders",
  async (data, thunkAPI) => {
    try {
      return await authService.addOrders(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const LoginOTP = createAsyncThunk(
  "auth/user-login/OTP",
  async (user, thunkAPI) => {
    try {
      return await authService.loginotp(user);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const getWishlist = createAsyncThunk(
  "user/get-wishlist",
  async (user, thunkAPI) => {
    try {
      return await authService.getwishlist(user);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const addWishlist = createAsyncThunk(
  "user/add-wishlist",
  async (user, thunkAPI) => {
    try {
      return await authService.addwishlist(user);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const deleteWishlist = createAsyncThunk(
  "user/delete-wishlist",
  async (user, thunkAPI) => {
    try {
      return await authService.deletewishlist(user);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    handleLogout: (state, action) => {
      window.localStorage.removeItem("USER");
      window.localStorage.removeItem("TOKEN");
      state.user =null
      toast.success("User logged out");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload.user;
        if (state.isSuccess === true) {
          toast.success(action.payload.message);
          // setTimeout(() => {
          //   window.location.reload();
          // }, 300);
        }

        state.isError = false;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.user = null;
        toast.error(action.payload?.response?.data?.message);
      })
      .addCase(register.pending, (state, action) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.registerUser = action.payload.user;
        if (state.isSuccess === true) {
          toast.success(action.payload.message);
          // setTimeout(() => {
          //   state.registerUser = {};
          // }, 300);
        }
        state.isError = false;
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.user = null;
        if (state.isError === true) {
          toast.error(action?.payload?.response?.data?.message);
        }
      })

      .addCase(editUser.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
      })
      .addCase(editUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        toast.success(action.payload.message);
        localStorage.setItem("USER", JSON.stringify(action.payload?.user));

        state.isError = false;
      })
      .addCase(editUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;

        toast.error(action.payload?.response?.data?.message);
      })

      .addCase(forgotPassword.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
      })
      .addCase(forgotPassword.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        toast.success(action.payload.message);
        state.isError = false;
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;

        toast.error(action.payload?.response?.data?.message);
      })
      .addCase(forgotPasswordVerify.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
      })
      .addCase(forgotPasswordVerify.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        toast.success(action.payload.message);
        state.message = action.payload.message;
        state.isError = false;
      })
      .addCase(forgotPasswordVerify.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;

        toast.error(action.payload?.response?.data?.message);
      })
      .addCase(allOrders.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
      })
      .addCase(allOrders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.orders = action.payload;
      })
      .addCase(allOrders.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
      })
      .addCase(LoginOTP.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
      })
      .addCase(LoginOTP.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        toast.success(action.payload.message);
        state.isError = false;
      })
      .addCase(LoginOTP.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;

        toast.error(action.payload?.response?.data?.message);
      })
      .addCase(addOrders.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
      })
      .addCase(addOrders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        toast.success(action.payload.message);
        state.isError = false;
      })
      .addCase(addOrders.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;

        toast.error(action.payload?.response?.data?.message);
      })
      .addCase(addWishlist.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
      })
      .addCase(addWishlist.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        toast.success(action.payload.message);
        state.isError = false;
      })
      .addCase(addWishlist.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;

        toast.error(action.payload?.response?.data?.message);
      })
      .addCase(getWishlist.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
      })
      .addCase(getWishlist.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.wishlist = action.payload.wishlistItems;
        state.wishlistCount = action.payload.wishlistCount;
      })
      .addCase(getWishlist.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;

        toast.error(action.payload?.response?.data?.message);
      })
      .addCase(deleteWishlist.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
      })
      .addCase(deleteWishlist.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        toast.success(action.payload.message);
        state.isError = false;
      })
      .addCase(deleteWishlist.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;

        toast.error(action.payload?.response?.data?.message);
      });
  },
});

export const { handleLogout } = authSlice.actions;
export default authSlice.reducer;
