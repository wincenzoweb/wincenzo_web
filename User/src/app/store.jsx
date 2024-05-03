import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import productReducer from "../features/product/productSlice";
import cartReducer from "../features/cart/cartSlice";
import pageReducer from "../features/cms/pageSlice"
import VideoReducer from "../features/Video/VideoSlice"

const reduxStore = configureStore({
  reducer: {
    auth: authReducer,
    product: productReducer,
    cart: cartReducer,
    page: pageReducer,
    video:VideoReducer
  },
});
export default reduxStore;
