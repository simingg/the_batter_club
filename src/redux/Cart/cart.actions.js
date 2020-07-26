import "./cart.types";
import cartTypes from "./cart.types";

export const addToCart = (product) => ({
  type: cartTypes.ADD_TO_CART,
  payload: {
    productName: product.productName,
    productPrice: product.productPrice,
  },
});

export const fetchCartData = () => ({
  type: cartTypes.FETCH_CART_DATA,
});

export const addQtyItem = (name) => ({
  type: cartTypes.ADD_QTY_ITEM,
  payload: { name },
});

export const minusQtyItem = (name) => ({
  type: cartTypes.MINUS_QTY_ITEM,
  payload: { name },
});

export const delQtyItem = (name) => ({
  type: cartTypes.DEL_QTY_ITEM,
  payload: { name },
});

export const addDelivery = (user, details) => ({
  type: cartTypes.ADD_DELIVERY,
  payload: { user, details },
});

export const sendCartData = (user, date, cart) => ({
  type: cartTypes.SEND_CART_TO_DATA,
  payload: { user, date, cart },
});

export const addDeliverySuccess = () => ({
  type: cartTypes.ADD_DELIVERY_SUCCESS,
});

export const clearCart = () => ({
  type: cartTypes.CLEAR_CART,
});
