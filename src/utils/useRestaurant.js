import { useState, useEffect } from "react";
import { swiggy_menu_api_URL} from "../constants";
//import { restaurantMenu } from '../config';

const useRestaurant = (restaurantId) => {
  const [restaurant, setRestaurant] = useState(null); 

  useEffect(() => {
    getRestaurantInfo();
  }, []);

  const getRestaurantInfo = async () => {
    try {
      /* Live Data */
      const response = await fetch(swiggy_menu_api_URL + restaurantId);
      const res_data = await response.json();
      /* Mock Data */
      //const res_data =  restaurantMenu;
      setRestaurant(res_data.response)
    } catch (error) {
      console.log(error);
    }
  };

  return restaurant;

}

export default useRestaurant;