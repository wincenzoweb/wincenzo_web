import layout from "./layout";
// import auth from "../pages/auth/common/store";
import auth from "./features/auth/authSlice";
import product from "./features/product/productSlice";
import category from "./features/category/categorySlice";
import blog from "./features/blog/blogSlice";
import user from "./features/user/userSlice";
import order from "./features/order/orderSlice";
import assign from "./features/orderAssign/assignSlice";
import image from "./features/image/imageSlice";
import page from "./features/cms/index";
import inquiry from "./features/inquiry";
import settings from "./features/settings/settingSlice";
import video from "./features/Video/VideoSlice"
import coupon from "./features/coupon/couponSlice"


const rootReducer = {
  layout,
  auth,
  user,
  product,
  category,
  blog,
  coupon,
  video,
  order,
  assign,
  page,
  inquiry,
  image,
  settings,
};
export default rootReducer;
