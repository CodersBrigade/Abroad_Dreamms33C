import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

import { Home } from "@material-ui/icons";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Navi from "./components/Header.jsx";
import LoginAdmin from "./pages/auth/LoginAdmin.jsx";
import DashboardStudent from "./pages/student/DashboardStudent.jsx";
import Admin from "./pages/auth/admin.jsx";
import Appointment from "./pages/admin/Appointment.jsx";
import Institution from "./pages/admin/Institution.jsx";

import Course from "./pages/admin/Course.jsx";
import Student from "./pages/admin/Student.jsx";
import Instructor from "./pages/admin/Instructor.jsx";
import SystemUsers from "./pages/admin/SystemUsers.jsx";
// import AdminSidebar from "./components/admin/AdminSidebar.jsx";

import SignUp from "./pages/login/SignUp.jsx";
import LoginForm from "./pages/login/LoginForm.jsx";
import StudentSidebar from "./pages/student/StudentDashboard/StudentSidebar.jsx";
import Courses from "./pages/student/StudentDashboard/Courses.jsx";
import Profile from "./pages/student/StudentDashboard/Profile.jsx";
import Institutions from "./pages/student/StudentDashboard/Institutions.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/course",
    element: <Courses />,
  },

  {
    path: "/login/student",
    element: <LoginForm />,
  },
  {
    path: "/nav",
    element: <StudentSidebar />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
  {
    path: "/institutions",
    element: <Institutions />,
  },

  {
    path: "/login/admin",
    element: <LoginAdmin />,
  },

  {
    path: "/dashboardstudent",
    element: <DashboardStudent />,
  },

  {
    path: "/sign-up",
    element: <SignUp />,
  },

  {
    path: "/student",
    element: <Student />,
  },

  {
    path: "/admin",
    element: <Admin />,
  },

  {
    path: "/admin/course",
    element: <Course />,
  },

  {
    path: "/admin/appointment",
    element: <Appointment />,
  },

  {
    path: "/admin/institution",
    element: <Institution />,
  },

  {
    path: "/admin/student",
    element: <Student />,
  },

  {
    path: "/admin/instructor",
    element: <Instructor />,
  },

  {
    path: "/admin/systemuser",
    element: <SystemUsers />,
  },

  {
    path: "/admin/payment",
    element: <AdminSidebar />,
  },

  {
    path: "/admin/applications",
    element: <AdminSidebar />,
  },

  {
    path: "/admin/chart",
    element: <AdminSidebar />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Navi />
    <RouterProvider router={router} />
  </React.StrictMode>
);
