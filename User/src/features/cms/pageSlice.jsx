import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import toast from "react-hot-toast";

import pageService from "./pageService";

export const getBlogs = createAsyncThunk("blog/get-blogs", async (thunkAPI) => {
  try {
    return await pageService.getAllBlogs();
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});
export const getBlog = createAsyncThunk(
  "blog/get-blog",
  async (data, thunkAPI) => {
    try {
      return await pageService.getblog(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const getHome = createAsyncThunk(
  "home/get-home",
  async (data, thunkAPI) => {
    try {
      return await pageService.getHome(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const getTandC = createAsyncThunk(
  "TandC/get-tandc",
  async (data, thunkAPI) => {
    try {
      return await pageService.getTandC(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const getPolicy = createAsyncThunk(
  "policy/get-policy",
  async (data, thunkAPI) => {
    try {
      return await pageService.getPolicy(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getshippinganddelivery = createAsyncThunk(
  "shippingAndDelivery/get-shippingAndDelivery",
  async (data, thunkAPI) => {
    try {
      return await pageService.getshippinganddelivery(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getCancellation = createAsyncThunk(
  "cancellation/get-cancellation",
  async (data, thunkAPI) => {
    try {
      return await pageService.getCancellation(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getAbout = createAsyncThunk(
  "about/get-about",
  async (data, thunkAPI) => {
    try {
      return await pageService.getAbout(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const addInquiry = createAsyncThunk(
  "inquiry/add-inquiry",
  async (data, thunkAPI) => {
    try {
      return await pageService.addinquiry(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getOrg = createAsyncThunk("org/get-org", async (thunkAPI) => {
  try {
    return await pageService.getOrg();
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const addSubscriber = createAsyncThunk(
  "subscriber/add-subscriber",
  async (data, thunkAPI) => {
    try {
      return await pageService.addSubscriber(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const addMessage = createAsyncThunk(
  "message/add-message",
  async (data, thunkAPI) => {
    try {
      return await pageService.addMessage(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const pageSlice = createSlice({
  name: "page",
  initialState: {
    isLoading: false,
    TermsAndConditions: null,
    PrivacyPolicy: null,
    cancellationAndRefund:null,
    ShippingAndDelivery:null,
    about: null,
    home: null,
    blog: null,
    blogs: [],
  },
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(getAbout.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAbout.fulfilled, (state, action) => {
        state.isLoading = null;
        state.about = action.payload[0];
      })
      .addCase(getAbout.rejected, (state, action) => {
        state.isLoading = false;
        toast.error(action.payload?.response?.data?.message);
      })

      .addCase(getHome.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getHome.fulfilled, (state, action) => {
        state.isLoading = false;
        state.home = action.payload?.data[0];
      })
      .addCase(getHome.rejected, (state, action) => {
        state.isLoading = false;
        toast.error(action.payload?.response?.data?.message);
      })
      .addCase(getPolicy.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getPolicy.fulfilled, (state, action) => {
        state.isLoading = false;
        state.PrivacyPolicy = action.payload?.Policys[0];
      })
      .addCase(getPolicy.rejected, (state, action) => {
        state.isLoading = false;
        toast.error(action.payload?.response?.data?.message);
      })
      .addCase(getTandC.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getTandC.fulfilled, (state, action) => {
        state.isLoading = false;
        state.TermsAndConditions = action.payload?.Conditions[0];
        state.totalCondition = action.payload?.totalCondition;
      })
      .addCase(getTandC.rejected, (state, action) => {
        state.isLoading = false;
        toast.error(action.payload?.response?.data?.message);
      })
      .addCase(getCancellation.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCancellation.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cancellationAndRefund = action.payload?.Conditions[0];
        state.totalCondition = action.payload?.totalCondition;
      })
      .addCase(getCancellation.rejected, (state, action) => {
        state.isLoading = false;
        toast.error(action.payload?.response?.data?.message);
      })
      .addCase(getshippinganddelivery.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getshippinganddelivery.fulfilled, (state, action) => {
        state.isLoading = false;
        state.ShippingAndDelivery = action.payload?.Conditions[0];
        state.totalCondition = action.payload?.totalCondition;
      })
      .addCase(getshippinganddelivery.rejected, (state, action) => {
        state.isLoading = false;
        toast.error(action.payload?.response?.data?.message);
      })

      .addCase(getBlogs.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getBlogs.fulfilled, (state, action) => {
        state.isLoading = false;
        state.blogs = action.payload?.blogs;
        state.totalBlogs = action.payload?.totalblogs;
      })
      .addCase(getBlogs.rejected, (state, action) => {})
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
      .addCase(getOrg.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOrg.fulfilled, (state, action) => {
        state.isLoading = false;
        state.org = action.payload.org[0];
        state.totalOrg = action.payload?.totalOrg;
      })
      .addCase(getOrg.rejected, (state, action) => {
        state.isLoading = false;
        toast.error(action.payload?.response?.data?.message);
      })
      .addCase(addSubscriber.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addSubscriber.fulfilled, (state, action) => {
        state.isLoading = false;
        toast.success(action.payload.message);
      })
      .addCase(addSubscriber.rejected, (state, action) => {
        state.isLoading = false;
        toast.error(action.payload?.response?.data?.message);
      })
      .addCase(addMessage.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addMessage.fulfilled, (state, action) => {
        state.isLoading = false;
        toast.success(action.payload.message);
      })
      .addCase(addMessage.rejected, (state, action) => {
        state.isLoading = false;
        toast.error(action.payload?.response?.data?.message);
      })
  },
});

export default pageSlice.reducer;
