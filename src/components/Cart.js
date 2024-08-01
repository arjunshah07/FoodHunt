import { useSelector } from "react-redux";
import { clearCart } from "../utils/cartSlice";
import ItemList from "./ItemList";
import { useDispatch } from "react-redux";
import {
  swiggy_menu_api_URL,
  IMG_CDN_URL,
  ITEM_IMG_CDN_URL,
  MENU_ITEM_TYPE_KEY,
  RESTAURANT_TYPE_KEY,
} from "../constants";
import useResMenuData from "../utils/useResMenuData";
import { useParams } from "react-router-dom";
import { useState } from "react";
const Cart = () => {
  const cartItems = useSelector((store) => store.cart.item);
  
  console.log(cartItems);
  const { resId } = useParams();
  const [restaurant, menuItems] = useResMenuData(
    swiggy_menu_api_URL,
    IMG_CDN_URL,
    resId,
    RESTAURANT_TYPE_KEY,
    MENU_ITEM_TYPE_KEY
  );
  const dispatch = useDispatch();

  const handleClearCart = () => {
    dispatch(clearCart());
  };
  const [showItems, setshowItems] = useState(true);
  return (
    <div className="text-center m-4 p-4">
      <h1 className="text-2xl font-bold">Cart</h1>
      <div className="w-6/12 m-auto">
        <button
          className=" p-2 m-2 bg-black text-white rounded-lg"
          onClick={handleClearCart}
        >
          Clear Cart
        </button>
        {cartItems?.length === 0 && (
          <h1> Cart is empty. Add Items to the cart!</h1>
        )
    }
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
  );
};

export default Cart;