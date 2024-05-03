import React, { lazy, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

// home pages  & dashboard
//import Dashboard from "./pages/dashboard";

// const Dashboard = lazy(() => import("./pages/dashboard"));
const Ecommerce = lazy(() => import("./pages/dashboard/ecommerce"));
// const CrmPage = lazy(() => import("./pages/dashboard/crm"));
// const ProjectPage = lazy(() => import("./pages/dashboard/project"));
// const BankingPage = lazy(() => import("./pages/dashboard/banking"));

const Login = lazy(() => import("./pages/auth/login"));
// const Login2 = lazy(() => import("./pages/auth/login2"));
// const Login3 = lazy(() => import("./pages/auth/login3"));
const Register = lazy(() => import("./pages/auth/register"));
// const Register2 = lazy(() => import("./pages/auth/register2"));
// const Register3 = lazy(() => import("./pages/auth/register3"));
const ForgotPass = lazy(() => import("./pages/auth/forgot-password"));
// const ForgotPass2 = lazy(() => import("./pages/auth/forgot-password2"));
// const ForgotPass3 = lazy(() => import("./pages/auth/forgot-password3"));
const LockScreen = lazy(() => import("./pages/auth/lock-screen"));
// const LockScreen2 = lazy(() => import("./pages/auth/lock-screen2"));
// const LockScreen3 = lazy(() => import("./pages/auth/lock-screen3"));
const Error = lazy(() => import("./pages/404"));

import Layout from "./layout/Layout";

const FileInput = lazy(() => import("./pages/forms/file-input"));

const ComingSoonPage = lazy(() => import("./pages/utility/coming-soon"));
const UnderConstructionPage = lazy(() =>
  import("./pages/utility/under-construction")
);

// const BlogDetailsPage = lazy(() => import("./pages/utility/blog/blog-details"));

const FaqPage = lazy(() => import("./pages/utility/faq"));

const Settings = lazy(() => import("./pages/Settings/Settings"));
const Profile = lazy(() => import("./pages/utility/profile"));
const NotificationPage = lazy(() => import("./pages/utility/notifications"));
const ChangelogPage = lazy(() => import("./pages/changelog"));

// widget pages

import Loading from "@/components/Loading";
import AdminPage from "./pages/auth/admin";
import ShippingPage from "./pages/ShippingPage/ShippingPage";


const CouponPage = lazy(() => import("./pages/coupons/index"));
const ReviewVideoPage = lazy(() => import("./pages/productReviewVideo/index"));
const AdvertismentVideoPage = lazy(() => import("./pages/advertisementVideo/index"));
const ProductDetails = lazy(() => import("./pages/product/ProductDetailsPage"));
const CategoryPage = lazy(() => import("./pages/category"));
const BlogPage = lazy(() => import("./pages/blog"));
const BlogDetailsPage = lazy(() => import("./pages/blog/BlogDetailsPage"));
const OrderPage = lazy(() => import("./pages/order"));
const UserPage = lazy(() => import("./pages/user"));
const DeliveryboyPage = lazy(() => import("./pages/deliveryboy"));
const ShippingAndDeliveryPage = lazy(() => import("./pages/cms/shipping and delivery"));
const CancellationAndRefundPage = lazy(() => import("./pages/cms/cancellation and refund"));
const ConditionPage = lazy(() => import("./pages/cms/termandconditions"));
const PolicyPage = lazy(() => import("./pages/cms/privacypolicy"));
const AboutPage = lazy(() => import("./pages/cms/about"));
const OrgPage = lazy(() => import("./pages/cms/org"));
const HomePage = lazy(() => import("./pages/cms/home"));
const InquiryPage = lazy(() => import("./pages/all Inquiry/inquiry"));
const MessagePge = lazy(() => import("./pages/all Inquiry/message"));
const SubscriberPage = lazy(() => import("./pages/all Inquiry/subscriber"));
const ProductPostPage = lazy(() => import("./pages/product"));
const loginOtp = lazy(() => import("./pages/auth/loginOtp"));
const loginOtpVerify = lazy(() => import("./pages/auth/loginOtpVerify"));
const ForgotPassVerify = lazy(() =>
  import("./pages/auth/forgot-password-verify")
);

function App() {
  return (
    <main className="App  relative">
      <Routes>
        <Route
          path="/"
          element={
            <Suspense fallback={<Loading />}>
              <Login />
            </Suspense>
          }
        />
        <Route
          path="/signin"
          element={
            <Suspense fallback={<Loading />}>
              <loginOtp />
            </Suspense>
          }
        />
        <Route
          path="/signin-verify"
          element={
            <Suspense fallback={<Loading />}>
              <loginOtpVerify />
            </Suspense>
          }
        />
        {/* <Route
          path="/login2"
          element={
            <Suspense fallback={<Loading />}>
              <Login2 />
            </Suspense>
          }
        /> */}
        {/* <Route
          path="/login3"
          element={
            <Suspense fallback={<Loading />}>
              <Login3 />
            </Suspense>
          }
        /> */}
        <Route
          path="/register"
          element={
            <Suspense fallback={<Loading />}>
              <Register />
            </Suspense>
          }
        />
        {/* <Route
          path="/register2"
          element={
            <Suspense fallback={<Loading />}>
              <Register2 />
            </Suspense>
          }
        /> */}
        {/* <Route
          path="/register3"
          element={
            <Suspense fallback={<Loading />}>
              <Register3 />
            </Suspense>
          }
        /> */}
        <Route
          path="/forgot-password"
          element={
            <Suspense fallback={<Loading />}>
              <ForgotPass />
            </Suspense>
          }
        />
        <Route
          path="/forgot-password-verify"
          element={
            <Suspense fallback={<Loading />}>
              <ForgotPassVerify />
            </Suspense>
          }
        />
        {/* <Route
          path="/forgot-password2"
          element={
            <Suspense fallback={<Loading />}>
              <ForgotPass2 />
            </Suspense>
          }
        /> */}
        {/* <Route
          path="/forgot-password3"
          element={
            <Suspense fallback={<Loading />}>
              <ForgotPass3 />
            </Suspense>
          }
        /> */}
        <Route
          path="/reset-password"
          element={
            <Suspense fallback={<Loading />}>
              <ForgotPass />
            </Suspense>
          }
        />
        {/* <Route
          path="/lock-screen2"
          element={
            <Suspense fallback={<Loading />}>
              <LockScreen2 />
            </Suspense>
          }
        /> */}
        {/* <Route
          path="/lock-screen3"
          element={
            <Suspense fallback={<Loading />}>
              <LockScreen3 />
            </Suspense>
          }
        /> */}
        <Route path="/admin" element={<Layout />}>
          {/* <Route path="dashboard" element={<Dashboard />} /> */}
          <Route index element={<Ecommerce />} />
          {/* <Route path="crm" element={<CrmPage />} /> */}
          {/* <Route path="project" element={<ProjectPage />} /> */}
          {/* <Route path="banking" element={<BankingPage />} /> */}
          {/* App pages */}

          <Route path="product" element={<ProductPostPage />} />
          <Route path="product/:id" element={<ProductDetails />} />
          <Route path="category" element={<CategoryPage />} />
          <Route path="blog" element={<BlogPage />} />
          <Route path="blog-details/:id" element={<BlogDetailsPage />} />

          <Route path="coupons" element={<CouponPage />} />
          <Route path="order" element={<OrderPage />} />
          <Route path="user" element={<UserPage />} />
          <Route path="deliveryboy" element={<DeliveryboyPage />} />
          <Route path="conditions" element={<ConditionPage />} />
          <Route path="policy" element={<PolicyPage />} />
          <Route path="cancellationandrefund" element={<CancellationAndRefundPage />} />
          <Route path="shippinganddelivery" element={<ShippingAndDeliveryPage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="org" element={<OrgPage />} />
          <Route path="home" element={<HomePage />} />
          <Route path="inquiry" element={<InquiryPage />} />
          <Route path="message" element={<MessagePge />} />
          <Route path="reviewvideo" element={<ReviewVideoPage />} />
          <Route path="advertisementvideo" element={<AdvertismentVideoPage />} />
          <Route path="subscriber" element={<SubscriberPage />} />
          <Route path="admin-list" element={<AdminPage />} />
          

          {/* Components pages */}
          <Route path="file-input" element={<FileInput />} />

          <Route path="faq" element={<FaqPage />} />
          <Route path="settings" element={<Settings />} />
          <Route path="profile" element={<Profile />} />

          <Route path="notifications" element={<NotificationPage />} />
          <Route path="changelog" element={<ChangelogPage />} />
          <Route path="*" element={<Navigate to="/404" />} />
          <Route path="productinvoice" element={<ShippingPage />} />
        </Route>
        <Route
          path="/404"
          element={
            <Suspense fallback={<Loading />}>
              <Error />
            </Suspense>
          }
        />
        <Route
          path="/coming-soon"
          element={
            <Suspense fallback={<Loading />}>
              <ComingSoonPage />
            </Suspense>
          }
        />
        <Route
          path="/under-construction"
          element={
            <Suspense fallback={<Loading />}>
              <UnderConstructionPage />
            </Suspense>
          }
        />
      </Routes>
    </main>
  );
}

export default App;
