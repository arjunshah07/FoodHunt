
import { createSlice  } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name : "cart" , 
  initialState : {
    items : [],
  },
  reducer: {
    addItem: (state, action) => {
      // Redux Toolkit uses immer BTS
      state.items.push(action.payload);
    },
  
    removeItem: (state ) => {
      state.items.pop();
    },
    clearCart : (state ) => {
      state.items.length = 0;
    } ,
  },
});
export const {addItem , removeItem , clearCart } = cartSlice.actions;
export default cartSlice.reducer;