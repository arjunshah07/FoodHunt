import React, { lazy, Suspense, useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import Header from "./components/Header";
import Body from "./components/Body";
import Footer from "./components/Footer";
import About from "./components/About";
import Error from "./components/Error";
import Contact from "./components/Contact";
import Login from "./components/Login";
import { createBrowserRouter , RouterProvider , Outlet } from "react-router-dom";
import RestaurantMenu from "./components/RestaurantMenu";

const AppLayout = () => {
    return (
        //one parent element
        <>
        <Header/>
        <Outlet/>
        <Footer/>
        </>
    );
}
const appRouter = createBrowserRouter([
    {path        : "/",
    element      : <AppLayout/>,
    errorElement : <Error/>,
    children     : [
        {
        path     : "about",
        element  : <About/>,
        },
        {
        path     : "contact",
        element  : <Contact />,
        },
        {
        path     : "/",
        element  : <Body/>,
        },
        {
        path     : "/restaurant/:resId",
        element  : <RestaurantMenu/>
        },
        
    ],
    },
    {
        path     : "/login",
        element  : <Login />,
        errorElement : <Error/>,
    }
    
]);
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={appRouter} />);