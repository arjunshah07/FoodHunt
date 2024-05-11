import { useParams } from "react-router-dom"; // import useParams for read `resId`
import {
  swiggy_menu_api_URL,
  IMG_CDN_URL,
  ITEM_IMG_CDN_URL,
  MENU_ITEM_TYPE_KEY,
  RESTAURANT_TYPE_KEY,
} from "../constants";
import { MenuShimmer } from "./Shimmer";
import useResMenuData from "../utils/useResMenuData"; // imported custom hook useResMenuData which gives restaurant Menu data from swigy api
import useOnline from "../utils/useOnline"; // imported custom hook useOnline which checks user is online or not
//import UserOffline from "./UserOffline";
import {useState}  from "react";
import { useDispatch } from "react-redux";
import { addItem } from "../utils/cartSlice";
const RestaurantMenu = () => {
  const { resId } = useParams(); // call useParams and get value of restaurant id using object destructuring
  const [restaurant, menuItems] = useResMenuData(
    swiggy_menu_api_URL,
    resId,
    RESTAURANT_TYPE_KEY,
    MENU_ITEM_TYPE_KEY
  );
 const [showItems, setshowItems] = useState(true);
  const isOnline = useOnline();
  
  // if user is not Online then return UserOffline component
  if(!isOnline){
    //return <UserOffline />
  }
  const handleClick = () => {
    setshowItems(!showItems);
  }
  const dispatch = useDispatch();
  const handleAddItem = () => {
    dispatch(addItem("pizza"))

  }
  return !restaurant ? (
    <MenuShimmer />
  ) : (
    <div className="restaurant-menu">
      <div className="restaurant-summary">
        <img
          className="restaurant-img"
          src={IMG_CDN_URL + restaurant?.cloudinaryImageId}
          alt={restaurant?.name}
        />
        <div className="restaurant-summary-details">
          <h2 className="restaurant-title">{restaurant?.name}</h2>
          <p className="restaurant-tags">{restaurant?.cuisines?.join(", ")}</p>
          <div className="restaurant-details">
            <div
              className="restaurant-rating"
              style={
                restaurant?.avgRating < 4
                  ? { backgroundColor: "var(--light-red)" }
                  : restaurant?.avgRating === "--"
                  ? { backgroundColor: "white", color: "black" }
                  : { color: "white" }
              }
            >
              <i className="fa-solid fa-star"></i>
              <span>{restaurant?.avgRating}</span>
            </div>
            <div className="restaurant-rating-slash">|</div>
            <div>{restaurant?.sla?.slaString}</div>
            <div className="restaurant-rating-slash">|</div>
            <div>{restaurant?.costForTwoMessage}</div>
          </div>
        </div>
      </div>

      <div className="restaurant-menu-content w-6/12 mx-auto my-4 bg-gray-50 shadow-lg p-4">
        <div className="menu-items-container">
          <div className="menu-title-wrap flex justify-between cursor-pointer" onClick={handleClick} >
            
            <span className=" font-bold text-lg">{"Recommended"} ({menuItems.length}) Items</span>
            <span>⬇️</span>
          </div>
          {showItems && <div className="menu-items-list">
            {menuItems.map((item) => (
              <div className="p-2 m-2 border-gray-200 border-b-2 text-left flex justify-between" key={item?.id}>
                <div className="w-9/12">
                  <h3 className="py-2">{item?.name}</h3>
                  <p className="item-cost">
                    {item?.price > 0
                      ? new Intl.NumberFormat("en-IN", {
                          style: "currency",
                          currency: "INR",
                        }).format(item?.price / 100)
                      : " "}
                  </p>
                  <p className="text-xs">{item?.description}</p>
                </div>
                <div className="w-3/12 p-4">
                  {item?.imageId && (
                    <img
                      className="menu-item-img"
                      src={ITEM_IMG_CDN_URL + item?.imageId}
                      alt={item?.name}
                    />
                  )}
                  <button className="add-btn" onClick = {handleAddItem}> ADD +</button>
                </div>
              </div>
            ))}
          </div>}
        </div>
      </div>
    </div>
  );
};

export default RestaurantMenu;
