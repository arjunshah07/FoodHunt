import {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import logo from '../../assests/logo-main.png';
 
 
 export const ImgComponent = ({item , itemname}) => { 
   return ( <a href="/">
    <img className={itemname} alt={itemname} src= {item} />
        </a>
)
 }
 export const Title = () => {
    return ( 
        <ImgComponent item = {logo} itemname = {"logo"}/>
    )
 };
 export const NavComponent = (user) => {
    const [isLoggedIn , setisLoggedIn] = useState(user.authenticated || false);
    const navigate = useNavigate();
  
    console.log("In Nav Component", user);
    
    const toggleLogin = () => {
      console.log("isLoggedIn", isLoggedIn);
      setisLoggedIn(!isLoggedIn);
      let params = (!user.authenticated ) ? { state: { authenticated: false } } :  { state: { authenticated: false, msg: "You have logged out of Insta Food App. " } } ;
      navigate('/login', params );
    }
    return (
        <div className='nav-items'>
            <ul>
                <li><Link to="/"><button classsName="nav-btn">Home</button></Link></li>
                <li><Link to="/about"><button classsName="nav-btn">About</button></Link></li>
                <li><Link to="/contact"><button classsName="nav-btn">Contact</button></Link></li>
                <li> <button classsName="nav-btn" onClick={() =>{toggleLogin()}} > {isLoggedIn? "Logout" : "Login"}</button></li>
            </ul>
        </div>
    );
 }
 
const Header = (state) => {
    return (
        <div className="header">
        <Title />
        <NavComponent {...state}/>
        </div>
    );
};

export default Header;