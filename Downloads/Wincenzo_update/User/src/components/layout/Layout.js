import React from 'react';
import Topbar from './Topbar';
import Header from './Header';
import { Outlet } from 'react-router-dom';
import Footer from './Footer';

const Layout = () => {
  return (
    <>
    <Topbar/>
    <Header/>
    <Outlet/>
    <Footer/>
    </>
  )
}

export default Layout;
