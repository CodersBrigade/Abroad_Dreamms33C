import React from 'react';
import {createBrowserRouter} from 'react-router-dom';

import StudentRegister from '../pages/login/StudentRegister.jsx';
import Login from '../pages/login/Login.jsx';
import Home from '../pages/home/Home.jsx';
import PageNotFound from "../pages/PageNotFound.jsx";
import AllCourses from "../pages/home/AllCourses.jsx";
import ForgotPassword from "../pages/login/forgotpassword.jsx";
import CreateNewPassword from "../pages/login/resetpassword.jsx";

const publicRoutes = createBrowserRouter([
    {path: '/', element: <Home/>},
    {path: '/login', element: <Login/>},
    {path: '/student/sign-up', element: <StudentRegister/>},
    {path: '/allCourses', element: <AllCourses/>},
    {path: '/forgot-password', element: <ForgotPassword/>},
    {path: '/reset-password', element: <CreateNewPassword />},
    {path: '*', element: <PageNotFound/>}




]);

export default publicRoutes;
