import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import authService from "./authService";
import { toast } from "react-toastify";

const getUserLocalStorage = window.localStorage.getItem("ADMIN")
  ? JSON.parse(window.localStorage.getItem("ADMIN"))
  : null;

const initialState = {
  admin: getUserLocalStorage,
  users: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
  addModal: false,
  editItem: {},
  editModal: false,
};

export const login = createAsyncThunk(
  "auth/admin-login",
  async (admin, thunkAPI) => {
    try {
      return await authService.login(admin);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const forgotPassword = createAsyncThunk(
  "auth/admin-forgot-password",
  async (admin, thunkAPI) => {
    try {
      return await authService.forgotPass(admin);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const forgotPasswordVerify = createAsyncThunk(
  "auth/admin-forgot-password-verify",
  async (admin, thunkAPI) => {
    try {
      return await authService.forgotPassVerify(admin);
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

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    handleLogout: (state, action) => {
      window.localStorage.removeItem("ADMIN");
      toast.success("User logged out successfully");
      state.admin = action.payload;
    },

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
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        toast.success("Login successful");
        state.admin = action.payload;
        state.isError = false;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.admin = null;

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
        state.message = action.payload.message;
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.isLoading = false;
        toast.error(action.payload?.response?.data?.message);
        state.isError = true;
        state.isSuccess = false;
        state.admin = null;
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
        state.isError = false;
      })
      .addCase(forgotPasswordVerify.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.admin = null;

        toast.error(action.payload?.response?.data?.message);
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
      });
  },
});

export const { handleLogout, updateData,toggleEditModal,openAddModal } = authSlice.actions;
export default authSlice.reducer;
