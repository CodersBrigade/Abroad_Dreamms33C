import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import {Home} from "@material-ui/icons";

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import Header from './components/Header.jsx';
import LoginAdmin from './pages/auth/LoginAdmin.jsx';
import DashboardAdmin from './pages/auth/DashboardAdmin.jsx';
import Appointment from "./pages/admin/Appointment.jsx";
import Institution from "./pages/admin/Institution.jsx";

import Course from "./pages/admin/Course.jsx";
import Student from "./pages/admin/Student.jsx";
import Instructor from "./pages/admin/Instructor.jsx";
import SystemUsers from "./pages/admin/SystemUsers.jsx";
// import AdminSidebar from "./components/admin/AdminSidebar.jsx";

import SignUp from './pages/login/SignUp.jsx';
import LoginForm from "./pages/login/LoginForm.jsx";

import StudentSidebar from "./components/student/StudentSidebar.jsx";
import DashboardStudent from './pages/student/DashboardStudent.jsx'



const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
  },

  {
    path: "/login/student",
    element: <LoginForm/>
  },

  {
    path: "/login/admin",
    element: <LoginAdmin/>
  },

  {

    path: "/student/dashboard",
    element: <DashboardStudent/>

  },

      {
    path: "/sign-up",
    element: <SignUp/>
  },

  {
    path: "/student",
    element: <Student/>
  },

  {
    path: "/admin/dashboard",
    element: <DashboardAdmin/>
  },

  {
    path: "/admin/course",
    element: <Course/>
  },

  {
    path: "/admin/appointment",
    element: <Appointment/>
  },

  {
    path: "/admin/institution",
    element: <Institution/>
  },

  {
    path: "/admin/student",
    element: <Student/>
  },

  {
    path: "/admin/instructor",
    element: <Instructor/>
  },

  {
    path: "/admin/systemuser",
    element: <SystemUsers/>
  },

  {
    path: "/admin/payment",
    element: <DashboardAdmin/>
  },

  {
    path: "/admin/applications",
    element: <DashboardAdmin/>
  },

  {
    path: "/admin/chart",
    element: <DashboardAdmin/>
  },

 
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Header/>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
