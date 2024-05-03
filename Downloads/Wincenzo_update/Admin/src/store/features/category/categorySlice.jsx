import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import avatar1 from "@/assets/images/avatar/av-1.svg";
import avatar2 from "@/assets/images/avatar/av-2.svg";
import avatar3 from "@/assets/images/avatar/av-3.svg";
import avatar4 from "@/assets/images/avatar/av-4.svg";
import { toast } from "react-toastify";
import categoryService from "./categoryService";

export const getCategories = createAsyncThunk(
  "product/get-categories",
  async (thunkAPI) => {
    try {
      return await categoryService.getCategories();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const addCategory = createAsyncThunk(
  "product/add-category",
  async (data, thunkAPI) => {
    try {
      return await categoryService.Addcategory(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const editCategory = createAsyncThunk(
  "product/edit-category",
  async (data, thunkAPI) => {
    try {
      return await categoryService.Editcategory(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const deleteCategory = createAsyncThunk(
  "product/delete-category",
  async (data, thunkAPI) => {
    try {
      return await categoryService.Delcategory(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const categorySlice = createSlice({
  name: "category",
  initialState: {
    categories: [],

    
    addModal: false,
    editModal: false,
    isLoading: false,
    editItem: {},
  },
  reducers: {
    // open add modal
    openAddModal: (state, action) => {
      state.addModal = action.payload;
    },


    
    updateCategory: (state, action) => {
      state.editModal = !state.editModal;
      state.editItem = action.payload;
      
    },

    closeEditModal: (state, action) => {
      state.editModal = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCategories.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCategories.fulfilled, (state, action) => {
        state.isLoading = false;
        state.categories = action.payload?.categories;
        state.totalCategories = action.payload?.totalCategories;
      })
      .addCase(getCategories.rejected, (state, action) => {})
      .addCase(addCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.newCategory = action.payload?.categories;

        toast.success(action.payload.message);
      })
      .addCase(addCategory.rejected, (state, action) => {
        state.isLoading = false;
        toast.error(action.payload?.response?.data?.message);
      })
      .addCase(deleteCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.isLoading = false;

        toast.success(action.payload.message);
      })
      .addCase(deleteCategory.rejected, (state, action) => {
        state.isLoading = false;
        toast.error(action.payload?.response?.data?.message);
      })
      .addCase(editCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(editCategory.fulfilled, (state, action) => {
        state.isLoading = false;

        state.editItem = {};
        toast.success(action.payload.message);
      })
      .addCase(editCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.editItem = {};
        toast.error(action.payload?.response?.data?.message);
      });
  },
});

export const {
  openAddModal,
  updateCategory,
  closeEditModal,
} = categorySlice.actions;
export default categorySlice.reducer;
