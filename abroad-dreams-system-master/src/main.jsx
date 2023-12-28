import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Navi from './components/Header.jsx';
import LoginStudent from './pages/loginStudent.jsx';
import LoginAdmin from './pages/auth/loginAdmin.jsx';
import Student from './pages/student.jsx';
import Admin from './pages/auth/admin.jsx';
import Appointment from "./pages/admin/Appointment.jsx";
import Institution from "./pages/admin/Institution.jsx";


const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
  },
  {
    path: "/login/student",
    element: <LoginStudent/>
  },
  {
    path: "/login/admin",
    element: <LoginAdmin/>
  },

  {
    path: "/student",
    element: <Student/>
  },

  {
    path: "/admin",
    element: <Admin/>
  },

  {
    path: "/admin/appointment",
    element: <Appointment/>
  },

  {
    path: "/admin/institution",
    element: <Institution/>
  },
 
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Navi/>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
