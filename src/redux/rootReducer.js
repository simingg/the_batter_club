import { combineReducers } from "redux";

import userReducer from "./User/user.reducer";
import productsReducer from "./Products/products.reducer";
import cartsReducer from "./Cart/cart.reducer";
import ordersReducer from "./Orders/orders.reducer";

export default combineReducers({
  user: userReducer,
  productsData: productsReducer,
  cart: cartsReducer,
  orderList: ordersReducer,
});
