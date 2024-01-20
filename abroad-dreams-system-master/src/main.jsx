import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {RouterProvider} from "react-router-dom";
import privateRoutes from './routing/privateRoutes.jsx';
import publicRoutes from "./routing/publicRoutes.jsx";
import {ToastContainer} from "react-toastify";
import {CartProvider} from "./components/home/navbar/CartContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <CartProvider>


        <ToastContainer />
        <RouterProvider fallbackElement={<>....</>} router={localStorage.getItem("accessToken") ? privateRoutes : publicRoutes}/>
        </CartProvider>
    </React.StrictMode>
);
