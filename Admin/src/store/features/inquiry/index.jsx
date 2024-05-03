import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { toast } from "react-toastify";
import Service from "./Service";

export const getInquiry = createAsyncThunk("inquiry/get-inquiry", async (thunkAPI) => {
  try {
    return await Service.getInquiry();
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const addInquiry = createAsyncThunk(
  "inquiry/add-inquiry",
  async (data, thunkAPI) => {
    try {
      return await Service.addInquiry(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const editInquiry = createAsyncThunk(
  "inquiry/edit-inquiry",
  async (data, thunkAPI) => {
    try {
      return await Service.EditInquiry(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const deleteInquiry = createAsyncThunk(
  "inquiry/delete-inquiry",
  async (data, thunkAPI) => {
    try {
      return await Service.DeleteInquiry(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getSubscriber = createAsyncThunk(
  "subscriber/get-subscriber", async (thunkAPI) => {
    try {
      return await Service.getSubscriber();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  });

export const deleteSubscriber = createAsyncThunk(
  "subscriber/delete-subscriber",
  async (data, thunkAPI) => {
    try {
      return await Service.deleteSubscriber(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getAllmessage = createAsyncThunk(
  "messages/get-messages", async (thunkAPI) => {
    try {
      return await Service.getAllmessage();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  });

  export const deleteMessage = createAsyncThunk(
    "messages/delete-messages",
    async (data, thunkAPI) => {
      try {
        return await Service.deleteMessage(data);
      } catch (error) {
        return thunkAPI.rejectWithValue(error);
      }
    }
  );


export const assignSlice = createSlice({
  name: "inquiry",
  initialState: {
    inquiries: [],
    messages: [],
    subscriber: [],
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

    updateData: (state, action) => {
      state.editModal = !state.editModal;
      state.editItem = action.payload;
    },


    closeEditModal: (state, action) => {
      state.editModal = action.payload;
    },


  },
  extraReducers: (builder) => {
    builder
      .addCase(getInquiry.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getInquiry.fulfilled, (state, action) => {
        state.isLoading = false;
        state.inquiries = action.payload?.inquirys;
        state.totalInquiry = action.payload?.totalInquiry;
      })
      .addCase(getInquiry.rejected, (state, action) => {
        state.isLoading = false;
        toast.error(action.payload?.response?.data?.message);
      })
      .addCase(addInquiry.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addInquiry.fulfilled, (state, action) => {
        state.isLoading = false;

        toast.success(action.payload.message);
      })
      .addCase(addInquiry.rejected, (state, action) => {
        state.isLoading = false;
        toast.error(action.payload?.response?.data?.message);
      })
      .addCase(deleteInquiry.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteInquiry.fulfilled, (state, action) => {
        state.isLoading = false;
        toast.success(action.payload.message);
      })
      .addCase(deleteInquiry.rejected, (state, action) => {
        state.isLoading = false;
        toast.error(action.payload?.response?.data?.message);
      })
      .addCase(editInquiry.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(editInquiry.fulfilled, (state, action) => {
        state.isLoading = false;

        state.editItem = {};
        toast.success(action.payload.message);
      })
      .addCase(editInquiry.rejected, (state, action) => {
        state.isLoading = false;
        state.editItem = {};
        toast.error(action.payload?.response?.data?.message);
      })
      .addCase(getSubscriber.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSubscriber.fulfilled, (state, action) => {
        state.isLoading = false;
        state.subscriber = action.payload?.subscriber;
        state.subscriberCount = action.payload?.subscriberCount;
      })
      .addCase(getSubscriber.rejected, (state, action) => {
        state.isLoading = false;
        toast.error(action.payload?.response?.data?.message);
      })

      .addCase(deleteSubscriber.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteSubscriber.fulfilled, (state, action) => {
        state.isLoading = false;
        toast.success(action.payload.message);
      })
      .addCase(deleteSubscriber.rejected, (state, action) => {
        state.isLoading = false;
        toast.error(action.payload?.response?.data?.message);
      })

      .addCase(getAllmessage.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllmessage.fulfilled, (state, action) => {
        state.isLoading = false;
        state.messages = action.payload?.messages;
        state.messagesCount = action.payload?.messagesCount;
      })
      .addCase(getAllmessage.rejected, (state, action) => {
        state.isLoading = false;
        toast.error(action.payload?.response?.data?.message);
      })

      .addCase(deleteMessage.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteMessage.fulfilled, (state, action) => {
        state.isLoading = false;
        toast.success(action.payload.message);
      })
      .addCase(deleteMessage.rejected, (state, action) => {
        state.isLoading = false;
        toast.error(action.payload?.response?.data?.message);
      })
  },
});

export const {
  openAddModal,
  updateData,
  closeEditModal,
} = assignSlice.actions;
export default assignSlice.reducer;
