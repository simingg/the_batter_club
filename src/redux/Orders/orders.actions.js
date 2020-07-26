import orderTypes from "./orders.types";

export const fetchOrders = () => ({
  type: orderTypes.FETCH_ORDER_DATA,
});

export const setOrders = (orders) => ({
  type: orderTypes.SET_ORDERS,
  payload: orders,
});
