import React, { useEffect } from "react";
import Banner from "./Home/Banner";
import Services from "./Home/Services";
import Useartis from "./Home/Useartis";
import Videobg from "./Home/Videobg";
import Fact from "./Home/Fact";

import Brand from "./Home/Brand";
import Newsletter from "./Home/Newsletter";


import { useDispatch, useSelector } from "react-redux";
import { getHome } from "../features/cms/pageSlice";
import Productgallery from "./Home/Productgallery";
import Advertisements from "./Home/Advertisement";

const Home = () => {
  const dispatch = useDispatch();
  const { home } = useSelector((state) => state.page);
  useEffect(() => {
    dispatch(getHome());
  }, [dispatch]);

  return (
    <>
      <Banner />
      <Services />
      <Useartis />
      <Videobg />
      <Productgallery />
      <Advertisements/>
      <Fact />
      <Brand />
      <Newsletter />
    </>
  );
};

export default Home;
