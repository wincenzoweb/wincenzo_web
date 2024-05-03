import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import VideoService from "./VideoService";


export const getReviewVideo = createAsyncThunk(
    "video/get-reviewVideo",
    async (thunkAPI) => {
        try {
            return await VideoService.getReviewVideo();
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);


export const addReviewVideo = createAsyncThunk(
    "video/add-reviewVideo",
    async (data, thunkAPI) => {
        try {
            return await VideoService.addReviewVideo(data);
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);

export const updateReviewVideo = createAsyncThunk(
    "video/update-reviewVideo",
    async (data, thunkAPI) => {
        try {
            return await VideoService.updateReviewVideo(data);
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);

export const deleteReviewVideo = createAsyncThunk(
    "video/delete-reviewVideo",
    async (data, thunkAPI) => {

        try {
            return await VideoService.deleteReviewVideo(data);
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);

export const getAdvertisementVideo = createAsyncThunk(
    "video/get-advertisementVideo",
    async (_, thunkAPI) => {
        try {
            return await VideoService.getAdvertisementVideo();
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);

export const addAdvertisementVideo = createAsyncThunk(
    "video/add-advertisementVideo",
    async (data, thunkAPI) => {
        try {
            return await VideoService.addAdvertisementVideo(data);
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);

export const updateAdvertisementVideo = createAsyncThunk(
    "video/update-advertisementVideo",
    async (data, thunkAPI) => {
        try {
            return await VideoService.updateAdvertisementVideo(data);
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);

export const deleteAdvertisementVideo = createAsyncThunk(
    "video/delete-advertisementVideo",
    async (data, thunkAPI) => {
        try {
            return await VideoService.deleteAdvertisementVideo(data);
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);



export const VideoSlice = createSlice({
    name: "video",
    initialState: {
        reviewVideos: [],
        advertisementVideos: [],
        addModal: false,
        editModal: false,
        isLoading: false,
        editItem: {},
    },
    reducers: {

        openAddModal: (state, action) => {
            state.addModal = action.payload;
        },

        updateVideo: (state, action) => {
            state.editModal = !state.editModal;
            state.editItem = action.payload;
        },

        closeEditModal: (state, action) => {
            state.editModal = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getReviewVideo.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getReviewVideo.fulfilled, (state, action) => {
                state.isLoading = false;
                state.reviewVideos = action.payload?.reviewVideos;
            })
            .addCase(getReviewVideo.rejected, (state, action) => {
                state.isLoading = false;
                toast.error(action.payload?.response?.data?.message);
            })

            .addCase(addReviewVideo.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(addReviewVideo.fulfilled, (state, action) => {
                state.isLoading = false;
               
                toast.success(action.payload.message);
            })
            .addCase(addReviewVideo.rejected, (state, action) => {
                state.isLoading = false;
                toast.error(action.payload?.response?.data?.message);
            })

            .addCase(updateReviewVideo.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateReviewVideo.fulfilled, (state, action) => {
                state.isLoading = false;
                state.editItem = {};
                toast.success(action.payload.message);
            })
            .addCase(updateReviewVideo.rejected, (state, action) => {
                state.isLoading = false;
                state.editItem = {};
                toast.error(action.payload?.response?.data?.message);
            })

            .addCase(deleteReviewVideo.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteReviewVideo.fulfilled, (state, action) => {
                state.isLoading = false;
                toast.success(action.payload.message);
            })
            .addCase(deleteReviewVideo.rejected, (state, action) => {
                state.isLoading = false;
                toast.error(action.payload?.response?.data?.message);
            })

            .addCase(getAdvertisementVideo.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getAdvertisementVideo.fulfilled, (state, action) => {
                state.isLoading = false;
                state.advertisementVideos = action.payload?.advertisementVideos;
            })
            .addCase(getAdvertisementVideo.rejected, (state, action) => {
                state.isLoading = false;
                toast.error(action.payload?.response?.data?.message);
            })

            .addCase(addAdvertisementVideo.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(addAdvertisementVideo.fulfilled, (state, action) => {
                state.isLoading = false;
               
                toast.success(action.payload.message);
            })
            .addCase(addAdvertisementVideo.rejected, (state, action) => {
                state.isLoading = false;
                toast.error(action.payload?.response?.data?.message);
            })

            .addCase(updateAdvertisementVideo.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateAdvertisementVideo.fulfilled, (state, action) => {
                state.isLoading = false;
                state.editItem = {};
                toast.success(action.payload.message);
            })
            .addCase(updateAdvertisementVideo.rejected, (state, action) => {
                state.isLoading = false;
                state.editItem = {};
                toast.error(action.payload?.response?.data?.message);
            })

            .addCase(deleteAdvertisementVideo.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteAdvertisementVideo.fulfilled, (state, action) => {
                state.isLoading = false;
                toast.success(action.payload.message);
            })
            .addCase(deleteAdvertisementVideo.rejected, (state, action) => {
                state.isLoading = false;
                toast.error(action.payload?.response?.data?.message);
            });

    },
});

export const { openAddModal, updateVideo, closeEditModal } = VideoSlice.actions;
export default VideoSlice.reducer;