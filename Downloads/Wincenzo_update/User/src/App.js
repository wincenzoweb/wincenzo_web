import React, { Suspense, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Home from "./pages/Home";
import About from "./pages/About";
import "bootstrap-icons/font/bootstrap-icons.css";


import SingleProduct from "./pages/Product/SingleProduct";
import Cart from "./pages/Cart/Cart";
import Checkout from "./pages/Checkout/Checkout";
import Login from "./pages/Login/Reg/Login";
import Register from "./pages/Login/Reg/Register";
import UserProfile from "./pages/MyAccount/User/UserProfile";
import Wishlist from "./pages/Wishlist/Wishlist";
import Contact from "./pages/Contact";
import Privacy from "./pages/Privacy_page/Privacy";
import RefundPolicy from "./pages/RefundPolicy/RefundPolicy";
import TermsAndCondi from "./pages/Terms _Condi/TermsAndCondi";
import Loading from "./components/Loading";
import { Toaster } from "react-hot-toast";
import LoginEmail from "./pages/Login/Reg/LoginEmail";
import LoginOtpVerify from "./pages/Login/Reg/LoginOtpVerify";
import LoginOtp from "./pages/Login/Reg/LoginOtp";
import AllBlog from "./pages/Blog/AllBlog";
import SingleBlog from "./pages/Blog/SingleBlog";
// import ProductList from "./pages/Product/ProductList";
import AllProduct from "./pages/Product/Productslider";
import CommingSoon from "./pages/CommingSoon/CommingSoon";
import Complate from "./pages/Complate";
import { ShippingAndDelivery } from "./pages/Shipping And Delivery/ShippingAndDelivery";
import ScrollToTop from "./components/ScrolltoTop/ScrollToTop";
import ReactGA from 'react-ga';
const TRACKING_ID = "G-1M9N86NWH6"; // OUR_TRACKING_ID
ReactGA.initialize(TRACKING_ID);

const App = () => {

  useEffect(() => {
    ReactGA.pageview(window.location.pathname + window.location.search);
  }, []);

  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route
          path="/"
          element={
            <Suspense fallback={<Loading />}>
              <Layout />
            </Suspense>
          }
        >
          <Route index element={<Home />} />
          {/* <Route path="product" element={<Product />} /> */}
          {/* <Route path="product" element={<ProductList />} /> */}
          <Route path="product" element={<AllProduct />} />
          <Route path="product/:id" element={<SingleProduct />} />

          {/* must be dellete after product complate */}
          <Route path="singleproduct" element={<SingleProduct />} />
          {/* must be dellete after product complate */}

          <Route path="blog" element={<AllBlog />} />
          <Route path="blog/:id" element={<SingleBlog />} />

          <Route path="about" element={<About />} />
          <Route path="complate" element={<Complate />} />
          <Route path="contact" element={<Contact />} />
          <Route path="cart" element={<Cart />} />
          <Route path="wishlist" element={<Wishlist />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="login" element={<Login />} />
          <Route path="login-otp" element={<LoginOtp />} />
          <Route path="login-verify" element={<LoginOtpVerify />} />
          <Route path="signin" element={<LoginEmail />} />
          <Route path="register" element={<Register />} />
          <Route path="/:activepage" element={<UserProfile />} />
          <Route path="privacy" element={<Privacy />} />
          <Route path="refundpolicy" element={<RefundPolicy />} />
          <Route path="termsandcondition" element={<TermsAndCondi />} />
          <Route path="shippinganddelivery" element={<ShippingAndDelivery />} />
          <Route path="/commingsoon" element={<CommingSoon />} />
        </Route>
      </Routes>
      <Toaster />
    </BrowserRouter>
  );
};

export default App;
