import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Layout from '../Layout/Layout';
import Blogs from '../Pages/Blogs/Blogs';
import ChildDetails from '../Pages/ChildDetails';
import Childpage from '../Pages/Childpage';
import Home from '../Pages/Home/Home';
import Result from '../Pages/Result';
import ServiceDetails from '../Pages/Services/ServiceDetails';
import ServiceResult from '../Pages/Services/ServiceResult';
import ShowService from '../Pages/Services/ShowService';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout></Layout>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/home",
        element: <Home></Home>,
      },
      {
        path: "/blogs",
        element: <Blogs></Blogs>,
      },
      {
        path: "/child/:id",
        element: <Childpage></Childpage>,
      },
      {
        path: "/childdetails",
        element: <ChildDetails></ChildDetails>,
      },
      {
        path: "/service/showService/:id",
        element: <ShowService></ShowService>,
      },
      {
        path: "/service/checkfriend",
        element: <ServiceDetails></ServiceDetails>,
      },
      {
        path: "/result/:id",
        element: <Result></Result>
      },
      {
        path: "/service/serviceResult",
        element: <ServiceResult></ServiceResult>,
      },
    ],
  },
]);

export default router;