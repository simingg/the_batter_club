import orderTypes from "./orders.types";

const INITIAL_STATE = {
  orders: [],
};

const ordersReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case orderTypes.SET_ORDERS:
      return {
        ...state,
        orders: action.payload,
      };
    default:
      return state;
  }
};

export default ordersReducer;
