import React from 'react';
import {createBrowserRouter} from 'react-router-dom';

//Student Login-Register
import StudentRegister from '../pages/login/StudentRegister.jsx';
import Login from '../pages/login/Login.jsx';

import LoginAdmin from '../pages/auth/LoginAdmin.jsx';
import Home from '../pages/home/Home.jsx';
import PageNotFound from "../pages/PageNotFound.jsx";

const publicRoutes = createBrowserRouter([
    {path: '/', element: <Home/>},
    {path: '/login', element: <Login/>},
    {path: '/student/sign-up', element: <StudentRegister/>},
    {path: '*', element: <PageNotFound/>}

]);

export default publicRoutes;
