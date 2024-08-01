import React, {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import logo1 from '../../assests/logo1.png';
import useOnline from '../utils/useOnline';
import {useContext} from 'react';
import UserContext from "../utils/UserContext";
import { useSelector } from 'react-redux'; 
//import { UserAuth } from "../utils/AuthContext";

export const ImgComponent = ({item , itemname}) => { 
   return ( <a href="/">
    <img className="logo1 ml-2.5 w-[110px]" alt={itemname} src= {item}  />
        </a>
)
 }
 
 export const Title = () => {
    return ( 
        <ImgComponent item = {logo1} />
    )
 };
 export const NavComponent = (user) => {
    const [isLoggedIn , setisLoggedIn] = useState(user.authenticated || false);
    const navigate = useNavigate();
    const isOnline = useOnline();
    console.log("In Nav Component", user);
    const { loggedInUser } = useContext(UserContext);
    // Subscribing to a store using selector
    const cartItems = useSelector((store) => store.cart.item);
    //console.log(cartItems);

    const toggleLogin = () => {
      console.log("isLoggedIn", isLoggedIn);
      setisLoggedIn(!isLoggedIn);
      let params = (!user.authenticated ) ? { state: { authenticated: false } } :  { state: { authenticated: false, msg: "You have logged out of Insta Food App. " } } ;
      navigate('/Login', params );
    }
    const handleSignOut = async () => {
      try {
        await logOut();
        navigate("/");
      } catch (error) {
        console.log(error);
      }
    };
    
    const handleSignIn = () => {
      navigate("/signin");
    };
    //
    return (
        <div className='nav-items'>
            <ul className="flex max-w-2xl items-center justify-between mt-2.5 mr-2.5 ">
                <li className="p-2.5"><Link to="/"><button classsName="nav-btn">Home</button></Link></li>
                <li className="p-2.5"><Link to="/about"><button classsName="nav-btn">About</button></Link></li>
                <li className= "px-4 font-bold text-xl"> <Link to="/cart">🛒 ({cartItems.length} items)</Link>
          </li>
                <li className="p-2.5"><Link to="/contact"><button classsName="nav-btn">Contact</button></Link></li>
                <li className="p-2.5"> <button classsName="nav-btn" onClick={() =>{toggleLogin()}} > {isLoggedIn? "Logout" : "Login"}
                <span className={isOnline ? "text-green" : "text-red" }>●</span></button></li>
                <li className="px-4">{loggedInUser}</li>
            </ul>
        </div>
    );
 }
 export const Intro = () => {
    const {user} = useContext(UserContext);
    return(
      <div className='flex justify-center items-center'>
        <span className="py-2.5 px-1 mt-2.5 mr-1 font-bold text-green"> { user?.name ? `hello  ${user?.name}` : "Please Login "} !!!</span>
      </div>
    )
  };
 
const Header = (state) => {
    return (
        <div className="flex justify-between bg-slate-50 shadow fixed top-0 left-0 w-full h-[80px] ">
        <Title />
        <Intro />
        <NavComponent {...state}/>
        </div>
    );
};

export default Header;