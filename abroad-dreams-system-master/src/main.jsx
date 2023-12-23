import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Navi from './components/nav.jsx';
import LoginStudent from './pages/loginStudent.jsx';
import LoginAdmin from './pages/auth/loginAdmin.jsx';
import Student from './pages/student.jsx';
import Admin from './pages/auth/admin.jsx';


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
 
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Navi/>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
