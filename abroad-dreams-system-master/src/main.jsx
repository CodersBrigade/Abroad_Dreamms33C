import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {RouterProvider} from "react-router-dom";

import privateRoutes from './routing/privateRoutes.jsx';
import Header from "./components/Header.jsx";
import publicRoutes from "./routing/publicRoutes.jsx";



ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <RouterProvider router={localStorage.getItem("accessToken") ? privateRoutes : publicRoutes}/>
    </React.StrictMode>
);
