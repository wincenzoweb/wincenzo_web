import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import blogService from "./blogService";

export const getBlogs = createAsyncThunk(
  "product/get-blogs",
  async (thunkAPI) => {
    try {
      return await blogService.getblogs();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const addBlog = createAsyncThunk(
  "product/add-blog",
  async (data, thunkAPI) => {
    try {
      return await blogService.Addblog(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const editBlog = createAsyncThunk(
  "product/edit-blog",
  async (data, thunkAPI) => {
    try {
      return await blogService.Editblog(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const deleteBlog = createAsyncThunk(
  "product/delete-blog",
  async (data, thunkAPI) => {
    try {
      return await blogService.Delblog(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const getBlog = createAsyncThunk(
  "product/get-blog",
  async (data, thunkAPI) => {
    try {
      return await blogService.getblog(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const blogSlice = createSlice({
  name: "blog",
  initialState: {
    blogs: [],
    blog: null,

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

    updateBlog: (state, action) => {
      state.editModal = !state.editModal;
      state.editItem = action.payload;
    },

    closeEditModal: (state, action) => {
      state.editModal = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getBlogs.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getBlogs.fulfilled, (state, action) => {
        state.isLoading = false;
        state.blogs = action.payload?.blogs;
        state.totalBlogs = action.payload?.totalblogs;
      })
      .addCase(getBlogs.rejected, (state, action) => {})
      .addCase(addBlog.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addBlog.fulfilled, (state, action) => {
        state.isLoading = false;
        state.newBlog = action.payload?.categories;

        toast.success(action.payload.message);
      })
      .addCase(addBlog.rejected, (state, action) => {
        state.isLoading = false;
        toast.error(action.payload?.response?.data?.message);
      })
      .addCase(deleteBlog.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteBlog.fulfilled, (state, action) => {
        state.isLoading = false;

        toast.success(action.payload.message);
      })
      .addCase(deleteBlog.rejected, (state, action) => {
        state.isLoading = false;
        toast.error(action.payload?.response?.data?.message);
      })
      .addCase(editBlog.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(editBlog.fulfilled, (state, action) => {
        state.isLoading = false;

        state.editItem = {};
        toast.success(action.payload.message);
      })
      .addCase(editBlog.rejected, (state, action) => {
        state.isLoading = false;
        state.editItem = {};
        toast.error(action.payload?.response?.data?.message);
      })
      .addCase(getBlog.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getBlog.fulfilled, (state, action) => {
        state.isLoading = false;

        state.blog = action.payload;
      })
      .addCase(getBlog.rejected, (state, action) => {
        state.isLoading = false;
        state.blog = null;
        toast.error(action.payload?.response?.data?.message);
      });
  },
});

export const { openAddModal, updateBlog, closeEditModal } = blogSlice.actions;
export default blogSlice.reducer;
