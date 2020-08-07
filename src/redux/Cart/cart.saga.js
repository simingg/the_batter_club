import { call, takeLatest, all, put } from "redux-saga/effects";
import cartTypes from "./cart.types";
import { firestore } from "../../firebase/utils";
import { addDeliverySuccess, clearCart } from "./cart.actions";

export function* addDetail({ payload: { user, details } }) {
  try {
    yield getDetailFromUserAuth(user, details);
  } catch (err) {
    console.log(err);
  }
}

export function* onAddDetailStart() {
  yield takeLatest(cartTypes.ADD_DELIVERY, addDetail);
}

export function* getDetailFromUserAuth(user, details) {
  try {
    yield call(handleAddDetails, { user, details });
    yield put(addDeliverySuccess());
  } catch (err) {
    console.log(err);
  }
}

export const handleAddDetails = async ({
  user: { id },
  details: { add, unit, postal },
}) => {
  const userRef = firestore.collection("users").doc(id);
  try {
    await userRef
      .update({
        address: [add, unit, postal],
      })
      .then(function () {
        console.log("doc added");
      });
  } catch (err) {
    console.log(err);
  }
};

export function* sendingCartData({ payload: { user, date, cart } }) {
  try {
    yield getCartFromUserAuth(user, date, cart);
  } catch (err) {
    console.log(err);
  }
}

export function* onSendCartData() {
  yield takeLatest(cartTypes.SEND_CART_TO_DATA, sendingCartData);
}

export function* getCartFromUserAuth(user, date, cart) {
  try {
    yield call(handleSendCartData, { user, date, cart });
  } catch (err) {
    console.log(err);
  }
}

export const handleSendCartData = async ({ user: { id }, date, cart }) => {
  const orderRef = firestore.collection("users").doc(id);
  const dateObj = { dateDeliver: date };
  const newArr = [];
  cart.map((item) => {
    const clonedItem = { ...item, ...dateObj };
    newArr.push(clonedItem);
  });
  try {
    await orderRef.update({
      orderedItems: newArr,
    });
  } catch (err) {
    console.log(err);
  }
};

export default function* userSagas() {
  yield all([call(onAddDetailStart), call(onSendCartData)]);
}
