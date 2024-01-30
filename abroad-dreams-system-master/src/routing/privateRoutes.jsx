import React from 'react';
import {createBrowserRouter} from 'react-router-dom';

// Student Login-Register
import DashboardAdmin from '../pages/admin/DashboardAdmin.jsx';
import Appointment from '../pages/admin/Appointment.jsx';
import Institution from '../pages/admin/Institution.jsx';
import Course from '../pages/admin/Course.jsx';
import Instructor from '../pages/admin/Instructor.jsx';
import Profile from '../pages/student/StudentDashboard/Profile.jsx';
import Institutions from '../pages/student/StudentDashboard/Institutions.jsx';
import StudentCourse from "../pages/student/StudentDashboard/StudentCourse.jsx";
import LatestSDashboard from "../pages/student/StudentDashboard/Dashboard.jsx";
import Home from "../pages/home/Home.jsx";
import Application from "../pages/admin/Application.jsx";
import Payment from "../pages/admin/Payment.jsx";
import StudentPayment from "../pages/student/StudentDashboard/StudentPayment.jsx";
import StudentApplication from "../pages/student/StudentDashboard/StudentApplication.jsx";
import AllCourses from "../pages/home/AllCourses.jsx";
import PageNotAuthorized from "../pages/PageNotAuthorized.jsx";
import Notice from "../pages/admin/Notice.jsx";
import AllNotices from "../pages/home/AllNotices.jsx";
import StudentNotice from "../pages/student/StudentDashboard/StudentNotice.jsx";
import ForgotPassword from "../pages/login/ForgotPassword.jsx";
import CreateNewPassword from "../pages/login/ResetPassword.jsx";
import PageNotFound from "../pages/PageNotFound.jsx";
import Student from "../pages/admin/Student.jsx";
import MyProfile from "../pages/student/StudentDashboard/MyProfile.jsx";


const privateRoutes = createBrowserRouter([
    {path: '/', element: <Home/>},


    //Admin Routing
    {path: '/admin/dashboard', element: <DashboardAdmin/>},
    {path: '/admin/course', element: <Course/>},
    {path: '/admin/appointment', element: <Appointment/>},
    {path: '/admin/institution', element: <Institution/>},
    {path: '/admin/student', element: <Student/>},
    {path: '/admin/instructor', element: <Instructor/>},
    {path: '/admin/application', element: <Application/>},
    {path: '/admin/payment', element: <Payment/>},
    {path: '/admin/notice', element: <Notice/>},

    //Student Routing
    {path: '/student/dashboard', element: <LatestSDashboard/>},
    {path: '/student/profile', element: <MyProfile/>},
    {path: '/student/institution', element: <Institutions/>},
    {path: '/student/studentCourses', element: <StudentCourse/>},
    {path: '/student/payment', element: <StudentPayment/>},
    {path: '/student/myapplication', element: <StudentApplication/>},
    {path: '/student/allCourses', element: <AllCourses/>},
    {path: '/student/allNotices', element: <AllNotices/>},
    {path: '/student/notice', element: <StudentNotice/>},

    //Dummy for Future Integration

    {path: '/forgot-password', element: <ForgotPassword/>},
    {path: '/reset-password', element: <CreateNewPassword />},

    {path: '*', element: <PageNotFound/>},
]);

export default privateRoutes;
