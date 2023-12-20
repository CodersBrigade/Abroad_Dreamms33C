import { createHashRouter, Navigate } from "react-router-dom";
import AuthGuard from "../guards/AuthGuard";
import CreateAccount from "../pages/auth/CreateAccount";
import ForgotPassword from "../pages/auth/ForgotPassword";
import Login from "../pages/auth/Login";
import Charts from "../pages/Charts";
import Dashboard from "../pages/Dashboard";
import Home from "../pages/Home";
import NewUser from "../pages/NewUser";
import User from "../pages/User";
import Users from "../pages/Users";
import Countries from "../pages/Countries";
import CreateCountryForm from "../components/create/CreateCountryForm";
import Country from "../pages/Country";
import Institutions from "../pages/Institutions";
import CreateInstitutionForm from "../components/create/CreateInstitutionForm";
import React from "react";
import Institution from "../pages/Institution";
import CreateStudentForm from "../components/create/CreateStudentForm";
import Students from "../pages/Students";
import Student from "../pages/Student";
import Classrooms from "../pages/Classrooms"; // Import the new Classrooms component
import CreateClassroomForm from "../components/create/CreateClassroomForm"; // Import the CreateClassroomForm component
import Classroom from "../pages/Classroom"; // Import the Classroom component



export const router = createHashRouter([


  {
    path: "/",
    element: <Navigate to="/login" replace />,
  },
  {
    path: "/dashboard",
    element: (
      <AuthGuard>
        <Dashboard />
      </AuthGuard>
    ),
    children: [
      {
        element: <Navigate to="/dashboard/home" replace />,
        index: true,
      },
      {
        path: "home",
        element: <Home />,
      },
      {
        path: "charts",
        element: <Charts />,
      },
      {
        path: "user",
        element: <User />,
      },
      {
        path: "users",
        element: <Users />,
      },
      {
        path: "users/new",
        element: <NewUser />,
      },
      {
        path: "/dashboard/country",
        element: <Country />,
      },
      {
        path: "/dashboard/countries", // Adjust the path for countries
        element: <Countries />, // Use the new Countries component
      },
      {
        path: "/dashboard/countries/new", // Adjust the path for creating a new country
        element: <CreateCountryForm />, // Use the CreateCountryForm component
      },

      {
        path: "/dashboard/institution", // Adjust the path for institutions
        element: <Institution />, // Use the new Institutions component
      },
      {
        path: "/dashboard/institutions/new", // Adjust the path for creating a new institution
        element: <CreateInstitutionForm />, // Use the CreateInstitutionForm component
      },

      {
        path: "/dashboard/institutions", // Adjust the path for creating a new institution
        element: <Institutions />, // Use the NewInstitution component
      },
      {
        path: "/dashboard/student", // Adjust the path for students
        element: <Student />, // Use the Student component
      },
      {
        path: "/dashboard/students/new", // Adjust the path for creating a new student
        element: <CreateStudentForm />, // Use the CreateStudentForm component
      },
      {
        path: "/dashboard/students", // Adjust the path for the list of students
        element: <Students />, // Use the Students component
      },
      {
        path: "/dashboard/classrooms", // Adjust the path for classrooms
        element: <Classrooms />, // Use the new Classrooms component
      },
      {
        path: "/dashboard/classrooms/new", // Adjust the path for creating a new classroom
        element: <CreateClassroomForm />, // Use the CreateClassroomForm component
      },
      {
        path: "/dashboard/classroom", // Adjust the path for classrooms
        element: <Classroom />, // Use the new Classroom component
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/forgot-password",
    element: <ForgotPassword />,
  },
  {
    path: "/create-account",
    element: <CreateAccount />,
  },
]);
