import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { toast } from "react-toastify";
import pageService from "./pageService";
//-------Shipping & Delivery--------//
export const getshippinganddelivery = createAsyncThunk("shippingAndDelivery/getShippingAndDelivery", async (thunkAPI) => {
  try {
    return await pageService.getshippinganddelivery();
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});
export const addshippinganddelivery = createAsyncThunk(
  "shippingAndDelivery/addShippingAndDelivery",
  async (data, thunkAPI) => {
    try {
      return await pageService.addshippinganddelivery(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const deleteshippinganddelivery = createAsyncThunk(
  "shippingAndDelivery/deleteShippingAndDelivery",
  async (data, thunkAPI) => {
    try {
      return await pageService.deleteshippinganddelivery(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const editshippinganddelivery = createAsyncThunk(
  "shippingAndDelivery/editShippingAndDelivery",
  async (data, thunkAPI) => {
    try {
      return await pageService.updateshippinganddelivery(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
//-------Cancellation--------//
export const getCancellation = createAsyncThunk("cancellation/getCancellation", async (thunkAPI) => {
  try {
    return await pageService.getCancellation();
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});
export const addCancellation = createAsyncThunk(
  "cancellation/addCancellation",
  async (data, thunkAPI) => {
    try {
      return await pageService.addCancellation(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const deleteCancellation = createAsyncThunk(
  "cancellation/deleteCancellation",
  async (data, thunkAPI) => {
    try {
      return await pageService.deleteCancellation(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const editCancellation = createAsyncThunk(
  "cancellation/editCancellation",
  async (data, thunkAPI) => {
    try {
      return await pageService.updateCancellation(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
//------------T & C-----------------//
export const getTandC = createAsyncThunk("T&C/get-t&c", async (thunkAPI) => {
  try {
    return await pageService.getTandC();
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});
export const addTandC = createAsyncThunk(
  "T&C/add-t&c",
  async (data, thunkAPI) => {
    try {
      return await pageService.addTandC(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const deleteTandC = createAsyncThunk(
  "T&C/delete-t&c",
  async (data, thunkAPI) => {
    try {
      return await pageService.deleteTandC(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const editTandC = createAsyncThunk(
  "T&C/update-t&c",
  async (data, thunkAPI) => {
    try {
      return await pageService.updateTandC(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getPolicy = createAsyncThunk(
  "Policy/get-policy",
  async (thunkAPI) => {
    try {
      return await pageService.getPolicy();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const addPolicy = createAsyncThunk(
  "Policy/add-policy",
  async (data, thunkAPI) => {
    try {
      return await pageService.addPolicy(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const deletePolicy = createAsyncThunk(
  "Policy/delete-Policy",
  async (data, thunkAPI) => {
    try {
      return await pageService.deletePolicy(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const editPolicy = createAsyncThunk(
  "Policy/update-Policy",
  async (data, thunkAPI) => {
    try {
      return await pageService.updatePolicy(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getAbout = createAsyncThunk(
  "About/get-about",
  async (thunkAPI) => {
    try {
      return await pageService.getAbout();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const addAbout = createAsyncThunk(
  "About/add-about",
  async (data, thunkAPI) => {
    try {
      return await pageService.addAbout(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const deleteAbout = createAsyncThunk(
  "About/delete-about",
  async (data, thunkAPI) => {
    try {
      return await pageService.deleteAbout(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const editAbout = createAsyncThunk(
  "About/update-about",
  async (data, thunkAPI) => {
    try {
      return await pageService.updateAbout(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getHome = createAsyncThunk("Home/get-Home", async (thunkAPI) => {
  try {
    return await pageService.getHome();
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});
export const addHome = createAsyncThunk(
  "Home/add-Home",
  async (data, thunkAPI) => {
    try {
      return await pageService.addHome(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const deleteHome = createAsyncThunk(
  "Home/delete-Home",
  async (data, thunkAPI) => {
    try {
      return await pageService.deleteHome(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const editHome = createAsyncThunk(
  "Home/update-Home",
  async (data, thunkAPI) => {
    try {
      return await pageService.updateHome(data);
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
export const addOrg = createAsyncThunk(
  "org/add-org",
  async (data, thunkAPI) => {
    try {
      return await pageService.addOrg(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const deleteOrg = createAsyncThunk(
  "org/delete-org",
  async (data, thunkAPI) => {
    try {
      return await pageService.deleteOrg(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const editOrg = createAsyncThunk(
  "org/update-org",
  async (data, thunkAPI) => {
    try {
      return await pageService.updateOrg(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const pageSlice = createSlice({
  name: "page",
  initialState: {
    TermsAndConditions: null,
    PrivacyPolicy: null,
    cancellationAndRefund: null,
    ShippingAndDelivery: null,
    about: null,
    home: null,
    org: null,

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
    },

    updateData: (state, action) => {
      state.editItem = action.payload;
      state.editModal = !state.editModal;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(getCancellation.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCancellation.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cancellationAndRefund = action.payload?.Conditions[0];
        state.totalConditions = action.payload?.totalConditions;
      })
      .addCase(getCancellation.rejected, (state, action) => {
        state.isLoading = false;
        toast.error(action.payload?.response?.data?.message);
      })
      .addCase(addCancellation.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addCancellation.fulfilled, (state, action) => {
        state.isLoading = false;
        toast.success(action.payload.message);
      })
      .addCase(addCancellation.rejected, (state, action) => {
        state.isLoading = false;
        toast.error(action.payload?.response?.data?.message);
      })
      .addCase(deleteCancellation.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteCancellation.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cancellationAndRefund = null;
        toast.success(action.payload.message);
      })
      .addCase(deleteCancellation.rejected, (state, action) => {
        state.isLoading = false;
        toast.error(action.payload?.response?.data?.message);
      })
      .addCase(editCancellation.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(editCancellation.fulfilled, (state, action) => {
        state.isLoading = false;
        state.editItem = {};
        toast.success(action.payload.message);
      })
      .addCase(editCancellation.rejected, (state, action) => {
        state.isLoading = false;
        state.editItem = {};
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
      .addCase(addshippinganddelivery.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addshippinganddelivery.fulfilled, (state, action) => {
        state.isLoading = false;
        toast.success(action.payload.message);
      })
      .addCase(addshippinganddelivery.rejected, (state, action) => {
        state.isLoading = false;
        toast.error(action.payload?.response?.data?.message);
      })
      .addCase(deleteshippinganddelivery.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteshippinganddelivery.fulfilled, (state, action) => {
        state.isLoading = false;
        state.ShippingAndDelivery = null;
        toast.success(action.payload.message);
      })
      .addCase(deleteshippinganddelivery.rejected, (state, action) => {
        state.isLoading = false;
        toast.error(action.payload?.response?.data?.message);
      })
      .addCase(editshippinganddelivery.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(editshippinganddelivery.fulfilled, (state, action) => {
        state.isLoading = false;
        state.editItem = {};
        toast.success(action.payload.message);
      })
      .addCase(editshippinganddelivery.rejected, (state, action) => {
        state.isLoading = false;
        state.editItem = {};
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
      .addCase(addTandC.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addTandC.fulfilled, (state, action) => {
        state.isLoading = false;
        toast.success(action.payload.message);
      })
      .addCase(addTandC.rejected, (state, action) => {
        state.isLoading = false;
        toast.error(action.payload?.response?.data?.message);
      })
      .addCase(deleteTandC.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteTandC.fulfilled, (state, action) => {
        state.isLoading = false;
        state.TermsAndConditions = null;
        toast.success(action.payload.message);
      })
      .addCase(deleteTandC.rejected, (state, action) => {
        state.isLoading = false;

        toast.error(action.payload?.response?.data?.message);
      })
      .addCase(editTandC.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(editTandC.fulfilled, (state, action) => {
        state.isLoading = false;
        state.editItem = {};
        toast.success(action.payload.message);
      })
      .addCase(editTandC.rejected, (state, action) => {
        state.isLoading = false;
        state.editItem = {};
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
      .addCase(addPolicy.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addPolicy.fulfilled, (state, action) => {
        state.isLoading = false;
        toast.success(action.payload.message);
      })
      .addCase(addPolicy.rejected, (state, action) => {
        state.isLoading = false;
        toast.error(action.payload?.response?.data?.message);
      })
      .addCase(deletePolicy.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deletePolicy.fulfilled, (state, action) => {
        state.isLoading = false;
        state.PrivacyPolicy = null;
        toast.success(action.payload.message);
      })
      .addCase(deletePolicy.rejected, (state, action) => {
        state.isLoading = false;
        toast.error(action.payload?.response?.data?.message);
      })
      .addCase(editPolicy.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(editPolicy.fulfilled, (state, action) => {
        state.isLoading = false;
        state.editItem = {};
        toast.success(action.payload.message);
      })
      .addCase(editPolicy.rejected, (state, action) => {
        state.isLoading = false;
        state.editItem = {};
        toast.error(action.payload?.response?.data?.message);
      })
      .addCase(getAbout.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAbout.fulfilled, (state, action) => {
        state.isLoading = false;
        state.about = action.payload[0];
      })
      .addCase(getAbout.rejected, (state, action) => {
        state.isLoading = false;
        toast.error(action.payload?.response?.data?.message);
      })
      .addCase(addAbout.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addAbout.fulfilled, (state, action) => {
        state.isLoading = false;
        toast.success(action.payload.message);
      })
      .addCase(addAbout.rejected, (state, action) => {
        state.isLoading = false;
        toast.error(action.payload?.response?.data?.message);
      })
      .addCase(deleteAbout.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteAbout.fulfilled, (state, action) => {
        state.isLoading = false;
        toast.success(action.payload.message);
      })
      .addCase(deleteAbout.rejected, (state, action) => {
        state.isLoading = false;
        toast.error(action.payload?.response?.data?.message);
      })
      .addCase(editAbout.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(editAbout.fulfilled, (state, action) => {
        state.isLoading = false;
        state.editItem = {};
        toast.success(action.payload.message);
      })
      .addCase(editAbout.rejected, (state, action) => {
        state.isLoading = false;
        state.editItem = {};
        toast.error(action.payload?.response?.data?.message);
      })
      .addCase(getHome.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getHome.fulfilled, (state, action) => {
        state.isLoading = false;
        state.home = action.payload?.data[0];
        state.productGallery = action.payload?.productGallery;
      })
      .addCase(getHome.rejected, (state, action) => {
        state.isLoading = false;
        toast.error(action.payload?.response?.data?.message);
      })
      .addCase(addHome.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addHome.fulfilled, (state, action) => {
        state.isLoading = false;
        toast.success(action.payload.message);
      })
      .addCase(addHome.rejected, (state, action) => {
        state.isLoading = false;
        toast.error(action.payload?.response?.data?.message);
      })
      .addCase(deleteHome.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteHome.fulfilled, (state, action) => {
        state.isLoading = false;
        toast.success(action.payload.message);
      })
      .addCase(deleteHome.rejected, (state, action) => {
        state.isLoading = false;
        toast.error(action.payload?.response?.data?.message);
      })
      .addCase(editHome.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(editHome.fulfilled, (state, action) => {
        state.isLoading = false;
        state.editItem = {};
        toast.success(action.payload.message);
      })
      .addCase(editHome.rejected, (state, action) => {
        state.isLoading = false;
        state.editItem = {};
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
      .addCase(addOrg.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addOrg.fulfilled, (state, action) => {
        state.isLoading = false;
        toast.success(action.payload.message);
      })
      .addCase(addOrg.rejected, (state, action) => {
        state.isLoading = false;
        toast.error(action.payload?.response?.data?.message);
      })
      .addCase(deleteOrg.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteOrg.fulfilled, (state, action) => {
        state.isLoading = false;
        toast.success(action.payload.message);
      })
      .addCase(deleteOrg.rejected, (state, action) => {
        state.isLoading = false;
        toast.error(action.payload?.response?.data?.message);
      })
      .addCase(editOrg.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(editOrg.fulfilled, (state, action) => {
        state.isLoading = false;
        state.editItem = {};
        toast.success(action.payload.message);
      })
      .addCase(editOrg.rejected, (state, action) => {
        state.isLoading = false;
        state.editItem = {};
        toast.error(action.payload?.response?.data?.message);
      });
  },
});

export const { openAddModal, toggleEditModal, updateData } = pageSlice.actions;
export default pageSlice.reducer;
