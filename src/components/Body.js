import Restrauntcard from "./Restrauntcard"; /* Import using Named Import */
import { useState, useEffect } from 'react';
import Shimmer from './Shimmer'; /* Shimmer component to display before page load */
//import { GET_RES_API_URL, restaurantList } from '../constants'; /* url to get Restaurant data */
import  {restaurantList}  from "../constants";
const filterData = (searchText, restaurants) => {
  return restaurants.filter(restaurant => restaurant?.data?.name?.toLowerCase()?.includes(searchText?.toLowerCase()));
}

const Body = () => {
  const [searchText, setSearchText] = useState();
  const [allRestaurants, setAllRestaurants] = useState([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  const [errorMsg, setErrorMsg] = useState('');

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

  console.log("render"); 

// Don't render component (Early return)
if (!allRestaurants) {
  console.log("early return")
  return null;
}
return (
    <div className= "container">
      <div className="search-container"> 
        <input type="text" placeholder=" Search for restaurant" value={searchText}
          className="search-input" key="input-text" onChange = {(e) => setSearchText(e.target.value)}/>
        <button className="search-btn" 
          onClick={searchData(searchText, allRestaurants)}> Search </button>
      </div>
    { errorMsg && 
      <div className="error-container" id="error">
        <span className="error-msg" id="error-msg">{errorMsg}</span>
      </div> 
    }
    
    {filteredRestaurants && filteredRestaurants.length > 0 ? (
  <div className="restaurant-List">
    {filteredRestaurants.map((restaurant) => (
      <Restrauntcard {...restaurant.info} key={restaurant.info.id} />
    ))}
  </div>
) : (
  <Shimmer />
)}
    
  </div>
  );

    
};

export default Body;