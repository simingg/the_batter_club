import cartTypes from "./cart.types";

const INITSTATE = {
  checkoutStatus: false,
  quantityByName: [],
  errs: [],
};

const cartsReducer = (state = INITSTATE, action) => {
  switch (action.type) {
    case cartTypes.ADD_TO_CART:
      const { productName, productPrice } = action.payload;
      return Object.assign({}, state, {
        quantityByName: [
          ...state.quantityByName,
          {
            name: productName.productName,
            price: productName.productPrice,
            quantity: 1,
            total: parseInt(productName.productPrice, 10),
          },
        ],
      });
    case cartTypes.ADD_QTY_ITEM:
      return {
        ...state,
        quantityByName: [
          ...state.quantityByName.map((item) =>
            item.name === action.payload.name.name
              ? {
                  ...item,
                  quantity: item.quantity + 1,
                  total: parseInt(item.total, 10) + parseInt(item.price, 10),
                }
              : item
          ),
        ],
      };
    case cartTypes.MINUS_QTY_ITEM:
      return {
        ...state,
        quantityByName: [
          ...state.quantityByName.map((item) =>
            item.name === action.payload.name.name
              ? {
                  ...item,
                  quantity: item.quantity - 1,
                  total: parseInt(item.total, 10) - parseInt(item.price, 10),
                }
              : item
          ),
        ],
      };

    case cartTypes.DEL_QTY_ITEM:
      return {
        ...state,
        quantityByName: [
          ...state.quantityByName.filter(
            (item) => item.name !== action.payload.name.name
          ),
        ],
      };
    case cartTypes.CLEAR_CART:
      return {
        ...state,
        quantityByName: [],
        checkoutStatus: true,
      };
    default:
      return state;
    case cartTypes.ADD_DELIVERY:
      return {
        ...state,
      };
  }
};

export default cartsReducer;
