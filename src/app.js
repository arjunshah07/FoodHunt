import React, { lazy, Suspense, useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import Header from "./components/Header";
import Body from "./components/body";
import Footer from "./components/Footer";
import About from "./components/About";
import Error from "./components/Error";
import Contact from "./components/Contact";
import Login from "./components/Login";
//import SignUp from "../src/components/SignUp";
import Cart from "./components/Cart";
import { createBrowserRouter , RouterProvider , Outlet } from "react-router-dom";
import RestaurantMenu from "./components/RestaurantMenu";
import UserContext from "./utils/UserContext";
import { Provider  } from "react-redux";
import appstore from "./utils/appstore";
//import { AuthContextProvider } from "./utils/context/AuthContext";
const AppLayout = () => {
    const [userName, setUserName] = useState();

    //authentication
    useEffect(() => {
      // Make an API call and send username and password
      const data = {
        name: "Arjun Shah",
      };
      setUserName(data.name);
      
    }, []);
   // <UserContext.Provider value= {{loggedInUser : userName , setUserName}}>
   //   </UserContext.Provider>

    return (<Provider store = {appstore}>
        <UserContext.Provider value={{ loggedInUser: userName}}>
        
        <div className="app">
        <Header/>
        <Outlet/>
        <Footer/>
        </div>
        </UserContext.Provider>
       </Provider>
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
        {
            path     : "/cart",
            element  : <Cart/>,   
            errorElement : <Error/>,
            },
        {
                path     : "/login",
                element  : <Login />,
                errorElement : <Error/>,
            },    
        
        
    ],
    },
    
    
    
]);
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={appRouter} />);