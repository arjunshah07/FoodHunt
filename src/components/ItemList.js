import { useDispatch } from "react-redux";
import { addItem } from "../utils/cartSlice";
import { CDN_URL } from "../constants";
import {
  swiggy_menu_api_URL,
  IMG_CDN_URL,
  ITEM_IMG_CDN_URL,
  MENU_ITEM_TYPE_KEY,
  RESTAURANT_TYPE_KEY,
} from "../constants";
import useResMenuData from "../utils/useResMenuData";
import { useState } from "react";

const ItemList = ({ items, dummy }) => {
  const dispatch = useDispatch();

  const handleAddItem = (item) => {
    // Dispatch an action
    dispatch(addItem(item));
  };
  const [restaurant, menuItems] = useResMenuData(
    swiggy_menu_api_URL,
    
    RESTAURANT_TYPE_KEY,
    MENU_ITEM_TYPE_KEY
  );
  const [showItems, setshowItems] = useState(true);
  return (
    <div>
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
  );
};

export default ItemList;