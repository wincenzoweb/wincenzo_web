import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import VideoService from "./VideoService"




export const getReviewVideo = createAsyncThunk(
    "Video/get-reviewVideo",
    async (thunkAPI) => {
        try {
            return await VideoService.getReviewVideo();
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);

export const getAdvertisementVideo = createAsyncThunk(
    "video/get-advertisementVideo",
    async (thunkAPI) => {
        try {
            return await VideoService.getAdvertisementVideo();
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
        isLoading: false,
    },
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(getReviewVideo.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getReviewVideo.fulfilled, (state, action) => {
                state.isLoading = false;
                console.log(action.payload)
                state.reviewVideos = action.payload?.reviewVideos;
            })
            .addCase(getReviewVideo.rejected, (state, action) => {
                state.isLoading = false;
                toast.error(action.payload?.response?.data?.message);
            })

            .addCase(getAdvertisementVideo.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getAdvertisementVideo.fulfilled, (state, action) => {
                state.isLoading = false;
                console.log(action.payload)
                state.advertisementVideos = action.payload?.advertisementVideos;
            })
            .addCase(getAdvertisementVideo.rejected, (state, action) => {
                state.isLoading = false;
                toast.error(action.payload?.response?.data?.message);
            });
    },
});


export default VideoSlice.reducer;