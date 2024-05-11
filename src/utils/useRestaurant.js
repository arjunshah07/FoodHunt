import { useState, useEffect } from "react";
import { GET_RESTAURANT_MENU} from "../constants";
//import { restaurantMenu } from '../config';

const useRestaurant = (restaurantId) => {
  const [restaurant, setRestaurant] = useState(null); 

  useEffect(() => {
    getRestaurantInfo();
  }, []);

  const getRestaurantInfo = async () => {
    try {
      /* Live Data */
      const response = await fetch(GET_RESTAURANT_MENU + restaurantId);
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