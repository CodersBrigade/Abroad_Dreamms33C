import React from 'react';
import {createBrowserRouter} from 'react-router-dom';

//Student Login-Register
import StudentRegister from '../pages/login/StudentRegister.jsx';
import StudentLogin from '../pages/login/StudentLogin.jsx';

import LoginAdmin from '../pages/auth/LoginAdmin.jsx';
import Home from '../pages/home/Home.jsx';
import PageNotFound from "../pages/PageNotFound.jsx";

const publicRoutes = createBrowserRouter([
    {path: '/', element: <Home/>},
    {path: '/login', element: <StudentLogin/>},
    {path: '/student/sign-up', element: <StudentRegister/>},
    {path: '*', element: <PageNotFound/>}

]);

export default publicRoutes;
