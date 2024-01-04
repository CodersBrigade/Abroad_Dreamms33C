import React from 'react';
import { createBrowserRouter } from 'react-router-dom';

import LoginAdmin from '../pages/auth/LoginAdmin.jsx';
import DashboardStudent from '../pages/student/DashboardStudent.jsx';
import Header from '../components/Header.jsx';
import StudentRegister from '../pages/login/StudentRegister.jsx';
import StudentLogin from '../pages/login/StudentLogin.jsx';
import DashboardAdmin from '../pages/admin/DashboardAdmin.jsx';
import Appointment from '../pages/admin/Appointment.jsx';
import Institution from '../pages/admin/Institution.jsx';
import Course from '../pages/admin/Course.jsx';
import Student from '../pages/admin/Student.jsx';
import Instructor from '../pages/admin/Instructor.jsx';
import SystemUsers from '../pages/admin/SystemUsers.jsx';
import StudentSidebar from '../pages/student/StudentDashboard/StudentSidebar.jsx';
import Courses from '../pages/student/StudentDashboard/Courses.jsx';
import Profile from '../pages/student/StudentDashboard/Profile.jsx';
import Institutions from '../pages/student/StudentDashboard/Institutions.jsx';
import ExtraNav from '../components/home/extranav/ExtraNav.jsx';
import AdminSidebar from '../components/admin/AdminSidebar.jsx';
import Home from '../pages/home/Home.jsx';

const routes = createBrowserRouter([
    { path: '/course', element: <Courses />},
    { path: '/login/student', element: <StudentLogin /> },
    { path: '/nav', element: <StudentSidebar /> },
    { path: '/profile', element: <Profile /> },
    { path: '/institutions', element: <Institutions /> },
    { path: '/login/admin', element: <LoginAdmin /> },
    { path: '/student/sign-up', element: <StudentRegister /> },
    { path: '/student/dashboard', element: <DashboardStudent /> },
    { path: '/student', element: <Student /> },
    { path: '/admin/dashboard', element: <DashboardAdmin /> },
    { path: '/admin/course', element: <Course /> },
    { path: '/admin/appointment', element: <Appointment /> },
    { path: '/admin/institution', element: <Institution /> },
    { path: '/admin/student', element: <Student /> },
    { path: '/admin/instructor', element: <Instructor /> },
    { path: '/admin/systemuser', element: <SystemUsers /> },
    { path: '/admin/payment', element: <AdminSidebar /> },
    { path: '/admin/applications', element: <AdminSidebar /> },
    { path: '/admin/chart', element: <AdminSidebar /> },
    { path: '/home', element: <Home /> },
    {
        path: '/',
        element: (
            <>
                <ExtraNav />
                <Home />

            </>
        ),
    },
]);

export default routes;
