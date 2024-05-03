import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import productService from "../product/productService";
import { toast } from "react-toastify";
import settingService from "./settingsService";

export const getAllsettings = createAsyncThunk(
    "product/get-settings",
    async (thunkAPI) => {
        try {
            return await settingService.getAllsettings();
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);

export const createRazorpaySettings = createAsyncThunk(
    "settings/create-razorpay-settings",
    async (data, thunkAPI) => {
        try {
            return await settingService.createRazorpaySettings(data);
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);

export const updateRazorpaySettings = createAsyncThunk(
    "settings/update-razorpay-settings",
    async (data, thunkAPI) => {
        try {
            return await settingService.updateRazorpaySettings(data);
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);

export const createTwilioSettings = createAsyncThunk(
    "settings/create-twilio-settings",
    async (data, thunkAPI) => {
        try {
            return await settingService.createTwilioSettings(data);
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);

export const updateTwilioSettings = createAsyncThunk(
    "settings/update-twilio-settings",
    async (data, thunkAPI) => {
        try {
            return await settingService.updateTwilioSettings(data);
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);

export const createGoogleAnalyticsSettings = createAsyncThunk(
    "settings/create-google-analytics-settings",
    async (data, thunkAPI) => {
        try {
            return await settingService.createGoogleAnalyticsSettings(data);
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);

export const updateGoogleAnalyticsSettings = createAsyncThunk(
    "settings/update-google-analytics-settings",
    async (data, thunkAPI) => {
        try {
            return await settingService.updateGoogleAnalyticsSettings(data);
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);

export const createMongoDBSettings = createAsyncThunk(
    "settings/create-mongodb-settings",
    async (data, thunkAPI) => {
        try {
            return await settingService.createMongoDBSettings(data);
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);

export const updateMongoDBSettings = createAsyncThunk(
    "settings/update-mongodb-settings",
    async (data, thunkAPI) => {
        try {
            return await settingService.updateMongoDBSettings(data);
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);



export const settingsSlice = createSlice({
    name: "settings",
    initialState: {
        settings: [],
        isLoading: false,
        
    },
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllsettings.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getAllsettings.fulfilled, (state,action) => {
                state.isLoading = false;
                
                state.settings =action.payload
            })
            .addCase(getAllsettings.rejected, (state,action) => {
                state.isLoading = false;
                toast.error(action.payload?.response?.data?.message);
            })

             // createRazorpaySettings
            .addCase(createRazorpaySettings.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createRazorpaySettings.fulfilled, (state, action) => {
                state.isLoading = false;
                state.settings.razorpay = action.payload;
              
            })
            .addCase(createRazorpaySettings.rejected, (state, action) => {
                state.isLoading = false;
                toast.error(action.payload?.response?.data?.message);
            })

             // updateRazorpaySettings
            .addCase(updateRazorpaySettings.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateRazorpaySettings.fulfilled, (state, action) => {
                state.isLoading = false;
                state.settings.razorpay = action.payload;
              
            })
            .addCase(updateRazorpaySettings.rejected, (state, action) => {
                state.isLoading = false;
                toast.error(action.payload?.response?.data?.message);
            })

            // createTwilioSettings
            .addCase(createTwilioSettings.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createTwilioSettings.fulfilled, (state, action) => {
                state.isLoading = false;
                state.settings.twilio = action.payload;
                
            })
            .addCase(createTwilioSettings.rejected, (state, action) => {
                state.isLoading = false;
                toast.error(action.payload?.response?.data?.message);
            })

            // updateTwilioSettings
            .addCase(updateTwilioSettings.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateTwilioSettings.fulfilled, (state, action) => {
                state.isLoading = false;
                state.settings.twilio = action.payload;
            })
            .addCase(updateTwilioSettings.rejected, (state, action) => {
                state.isLoading = false;
                toast.error(action.payload?.response?.data?.message);
            })

            // createGoogleAnalyticsSettings
            .addCase(createGoogleAnalyticsSettings.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createGoogleAnalyticsSettings.fulfilled, (state, action) => {
                state.isLoading = false;
                state.settings.googleAnalytics = action.payload;
            })
            .addCase(createGoogleAnalyticsSettings.rejected, (state, action) => {
                state.isLoading = false;
                toast.error(action.payload?.response?.data?.message);
            })

            // updateGoogleAnalyticsSettings
            .addCase(updateGoogleAnalyticsSettings.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateGoogleAnalyticsSettings.fulfilled, (state, action) => {
                state.isLoading = false;
                state.settings.googleAnalytics = action.payload;
            })
            .addCase(updateGoogleAnalyticsSettings.rejected, (state, action) => {
                state.isLoading = false;
                toast.error(action.payload?.response?.data?.message);
            })

            // createMongoDBSettings
            .addCase(createMongoDBSettings.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createMongoDBSettings.fulfilled, (state, action) => {
                state.isLoading = false;
                state.settings.mongodb = action.payload;
            })
            .addCase(createMongoDBSettings.rejected, (state, action) => {
                state.isLoading = false;
                toast.error(action.payload?.response?.data?.message);
            })

            // updateMongoDBSettings
            .addCase(updateMongoDBSettings.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateMongoDBSettings.fulfilled, (state, action) => {
                state.isLoading = false;
                state.settings.mongodb = action.payload;
            })
            .addCase(updateMongoDBSettings.rejected, (state, action) => {
                state.isLoading = false;
                toast.error(action.payload?.response?.data?.message);
            });
    }
})


export default  settingsSlice.reducer