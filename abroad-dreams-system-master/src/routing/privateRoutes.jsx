import React from 'react';
import {createBrowserRouter} from 'react-router-dom';

//Student Login-Register
import DashboardAdmin from '../pages/admin/DashboardAdmin.jsx';
import Appointment from '../pages/admin/Appointment.jsx';
import Institution from '../pages/admin/Institution.jsx';
import Course from '../pages/admin/Course.jsx';
import Student from '../pages/admin/Student.jsx';
import Instructor from '../pages/admin/Instructor.jsx';
import SystemUser from '../pages/admin/SystemUser.jsx';
import Profile from '../pages/student/StudentDashboard/Profile.jsx';
import Institutions from '../pages/student/StudentDashboard/Institutions.jsx';
import Courses from "../pages/student/StudentDashboard/Courses.jsx";
import LatestSDashboard from "../pages/student/StudentDashboard/Dashboard.jsx";
import PageNotFound from "../pages/PageNotFound.jsx";
import Home from "../pages/home/Home.jsx";
import Login from "../pages/login/Login.jsx";
import StudentRegister from "../pages/login/StudentRegister.jsx";
import Application from "../pages/admin/Application.jsx";
import Payment from "../pages/student/StudentDashboard/Payment.jsx";

const privateRoutes = createBrowserRouter([
    {path: '/', element: <Home/>},
    {path: '/login', element: <Login/>},
    {path: '/student/sign-up', element: <StudentRegister/>},
    {path: '/admin/dashboard', element: <DashboardAdmin/>},

    //Admin Routing
    {path: '/admin/course', element: <Course/>},
    {path: '/admin/appointment', element: <Appointment/>},
    {path: '/admin/institution', element: <Institution/>},
    {path: '/admin/student', element: <Student/>},
    {path: '/admin/instructor', element: <Instructor/>},
    {path: '/admin/systemUser', element: <SystemUser/>},
    {path: '/admin/application', element: <Application/>},

    //Student Routing
    {path: '/student/dashboard', element: <LatestSDashboard/>},
    {path: 'student/profile', element: <Profile/>},
    {path: 'student/institution', element: <Institutions/>},
    {path: '/student/studentCourses', element: <Courses/>},
    {path: '/student/payment', element: <Payment/>},

    //Dummy for Future Integration
    {path: '/admin/payment', element: <DashboardAdmin/>},
    {path: '/admin/applications', element: <DashboardAdmin/>},
    {path: '/admin/chart', element: <DashboardAdmin/>},
    {path: '*', element: <PageNotFound/>}

]);

export default privateRoutes;
