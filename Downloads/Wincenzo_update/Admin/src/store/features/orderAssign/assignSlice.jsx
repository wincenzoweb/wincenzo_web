import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { toast } from "react-toastify";
import assignService from "./assignService";

export const getAllAssign = createAsyncThunk(
  "assign/get-assign",
  async (thunkAPI) => {
    try {
      return await assignService.AllAssign();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const addAssign = createAsyncThunk(
  "assign/add-assign",
  async (data, thunkAPI) => {
    try {
      return await assignService.addAssign(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const editAssign = createAsyncThunk(
  "assign/edit-assign",
  async (data, thunkAPI) => {
    try {
      return await assignService.EditAssign(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const deleteAssign = createAsyncThunk(
  "assign/delete-assign",
  async (data, thunkAPI) => {
    try {
      return await assignService.DeleteAssign(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const assignSlice = createSlice({
  name: "orderAssign",
  initialState: {
    assignments: [],

    addModal: false,
    editModal: false,
    assignModal: false,
    isLoading: false,
    editItem: {},
  },
  reducers: {
    // open add modal
    openAddModal: (state, action) => {
      state.addModal = action.payload;
    },

    updateData: (state, action) => {
      state.editModal = !state.editModal;
      state.editItem = action.payload;
    },
    toggleModal: (state, action) => {
      state.assignModal = !state.editModal;
      state.editItem = action.payload;
    },

    closeEditModal: (state, action) => {
      state.editModal = action.payload;
    },

    closeAssignModal: (state, action) => {
      state.assignModal = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllAssign.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllAssign.fulfilled, (state, action) => {
        state.isLoading = false;
        state.assignments = action.payload?.assignments;
        state.totalOrderAssignments = action.payload?.totalOrderAssignments;
      })
      .addCase(getAllAssign.rejected, (state, action) => {
        state.isLoading = false;
        toast.error(action.payload?.response?.data?.message);
      })
      .addCase(addAssign.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addAssign.fulfilled, (state, action) => {
        state.isLoading = false;

        toast.success(action.payload.message);
      })
      .addCase(addAssign.rejected, (state, action) => {
        state.isLoading = false;
        toast.error(action.payload?.response?.data?.message);
      })
      .addCase(deleteAssign.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteAssign.fulfilled, (state, action) => {
        state.isLoading = false;

        toast.success(action.payload.message);
      })
      .addCase(deleteAssign.rejected, (state, action) => {
        state.isLoading = false;
        toast.error(action.payload?.response?.data?.message);
      })
      .addCase(editAssign.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(editAssign.fulfilled, (state, action) => {
        state.isLoading = false;

        state.editItem = {};
        toast.success(action.payload.message);
      })
      .addCase(editAssign.rejected, (state, action) => {
        state.isLoading = false;
        state.editItem = {};
        toast.error(action.payload?.response?.data?.message);
      });
  },
});

export const {
  openAddModal,
  updateData,
  closeEditModal,
  toggleModal,
  closeAssignModal,
} = assignSlice.actions;
export default assignSlice.reducer;
