import {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import logo from '../../assests/logo-main.png';
 import useOnline from '../utils/useOnline';
 
 export const ImgComponent = ({item , itemname}) => { 
   return ( <a href="/">
    <img className={itemname} alt={itemname} src= {item} />
        </a>
)
 }
 export const Title = () => {
    return ( 
        <ImgComponent item = {logo} itemname = {"logo ml-2.5 w-[70px]"}/>
    )
 };
 export const NavComponent = (user) => {
    const [isLoggedIn , setisLoggedIn] = useState(user.authenticated || false);
    const navigate = useNavigate();
    const isOnline = useOnline();
    console.log("In Nav Component", user);
    
    const toggleLogin = () => {
      console.log("isLoggedIn", isLoggedIn);
      setisLoggedIn(!isLoggedIn);
      let params = (!user.authenticated ) ? { state: { authenticated: false } } :  { state: { authenticated: false, msg: "You have logged out of Insta Food App. " } } ;
      navigate('/Login', params );
    }
    return (
        <div className='nav-items'>
            <ul className="flex max-w-2xl items-center justify-between mt-2.5 mr-2.5">
                <li className="p-2.5"><Link to="/"><button classsName="nav-btn">Home</button></Link></li>
                <li className="p-2.5"><Link to="/about"><button classsName="nav-btn">About</button></Link></li>
                <li className="p-2.5"><Link to="/contact"><button classsName="nav-btn">Contact</button></Link></li>
                <li className="p-2.5"> <button classsName="nav-btn" onClick={() =>{toggleLogin()}} > {isLoggedIn? "Logout" : "Login"}
                <span className={isOnline ? "text-green" : "text-red" }>●</span></button></li>
            </ul>
        </div>
    );
 }
 
const Header = (state) => {
    return (
        <div className="flex justify-between shadow fixed top-0 left-0 w-full h-[80px] z-50">
        <Title />
        <NavComponent {...state}/>
        </div>
    );
};

export default Header;