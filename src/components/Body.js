import Restrauntcard from "./Restrauntcard"; /* Import using Named Import */
import { useState, useEffect } from 'react';
import Shimmer from './Shimmer'; /* Shimmer component to display before page load */
//import { GET_RES_API_URL, restaurantList } from '../constants'; /* url to get Restaurant data */
import  {restaurantList}  from "../constants";
import {Link} from "react-router-dom";
import useOnline from "../utils/useOnline";
const filterData = (searchText, restaurants) => {
  return restaurants.filter(restaurant => restaurant?.info?.name?.toLowerCase()?.includes(searchText?.toLowerCase()));
}

const Body = () => {
  const [searchText, setSearchText] = useState();
  const [allRestaurants, setAllRestaurants] = useState([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  const [errorMsg, setErrorMsg] = useState('');
  const isOnline = useOnline();
  useEffect(()=>{
    console.log("useEffect")
    getRestaurants();
  },[]);

  const getRestaurants = async() => {
    try {
      const response = await fetch("https://www.swiggy.com/dapi/restaurants/list/v5?lat=26.89735982359463&lng=81.04558266699314&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING");
      const res_data = await response.json();
      setAllRestaurants(res_data?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
      setFilteredRestaurants(res_data?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
    } catch (error) {
      console.log(error);
    }
    
  };

  const searchData = (searchText, restaurants ) => ()=> {  
    if(searchText !== '') {
      const data = filterData(searchText,restaurants);
      setFilteredRestaurants(data); 
      setErrorMsg('');
    if (data.length === 0) {
      setErrorMsg('No matches found ');
    }
  } else {
      if(errorMsg) setErrorMsg('');
      console.log(allRestaurants);
      setAllRestaurants(allRestaurants);
    }
  }
  if(!isOnline) {
    return (<div className="mt-24 min-h-screen">
      <h1 className="font-bold text-red text-3xl text-center">Offline, please check your internet connection </h1>
      </div>)
  } 

  console.log("render"); 

// Don't render component (Early return)
if (!allRestaurants) {
  console.log("early return")
  return null;
}
return (
  <div className="mt-24 min-h-screen">
    <div className= "flex justify-start mob:flex-col">
      <div className="flex justify-evenly min-w-[500px] mob:min-w-[375px] h-[100px] mob:h-[50px] items-center m-auto"> 
        <input type="text" placeholder=" Search for restaurant" value={searchText}
          className="outline-none text-base mob:text-xs p-[5px] basis-[350px] mob:basis-[270px] h-[30px] rounded-md ring-1 ring-gray bg-gray" key="input-text" onChange = {(e) => setSearchText(e.target.value)}/>
        <button className="btn btn--primary basis-[60px] mob:basis-[50px] mob:text-xs hover:bg-blue-500" 
          onClick={searchData(searchText, allRestaurants)}> Search </button>
      </div>
      </div>
    { errorMsg && 
      <div className="h-14 m-auto text-center" id="error">
        <span className="error-msg w-14 h-8" id="error-msg">{errorMsg}</span>
      </div> 
    }
    
    {allRestaurants && allRestaurants.length > 0 ? (
  <div className="flex flex-wrap gap-5 justify-center">
    {allRestaurants.map((restaurant) => {
      return ( <Link
        className="basis-[450px] p-2.5 mb-2.5 mob:basis-[350px]" to={"/restaurant/" + restaurant.info.id} key={restaurant.info.id}>
      <Restrauntcard {...restaurant.info} key={restaurant.info.id} />
    </Link>)})}
  </div>
) : (
  <Shimmer />
)}
    
  </div>
  );

    
};

export default Body;