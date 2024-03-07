import React, { lazy, Suspense, useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import * as MainHeader from "./components/Header";
import Body from "./Body";
import { Footer as MainFooter } from "./Footer";
import About from "./components/About";
import Error from "./components/Error";
import Contact from "./components/Contact";
import { createBrowserRouter , RouterProvider } from "react-router-dom";
import RestaurantMenu from "./components/RestaurantMenu";

const AppLayout = () => {
    return (
        //one parent element
        <>
        <MainHeader.Header/>
        <Outlet/>
        <MainFooter/>
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
        }
    ],
    },
    {
        path     : "login",
        element  : <Login/>,
        errorElement : <Error/>,
    }
]);
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={appRouter} />);