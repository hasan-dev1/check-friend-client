import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from '../SharedPages/Footer/Footer';
import Navbar from '../SharedPages/Navbar/Navbar';

const Layout = () => {
    return (
        <div>
            <Navbar></Navbar>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default Layout;