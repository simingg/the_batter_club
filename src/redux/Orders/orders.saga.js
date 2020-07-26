import orderTypes from "./orders.types";
import { takeLatest, put, all, call } from "redux-saga/effects";
import { setOrders, fetchOrders } from "./orders.actions";
import { firestore } from "../../firebase/utils";

export function* fetchingOrders() {
  try {
    const orders = yield handleFetchOrders();
    yield put(setOrders(orders));
  } catch (err) {
    console.log(err);
  }
}

export function* onFetchOrdersStart() {
  yield takeLatest(orderTypes.FETCH_ORDER_DATA, fetchingOrders);
}

export const handleFetchOrders = () => {
  const orders = firestore.collection("users").get();

  return new Promise((resolve, reject) => {
    orders
      .then((snapshot) => {
        const ordersArray = snapshot.docs.map((doc) => {
          return {
            name: doc.data().displayName,
            phoneNumber: doc.data().phoneNumber,
            deliveringAddress: doc.data().address,
            orderedItems: doc.data().orderedItems,
          };
        });
        resolve(ordersArray);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export default function* ordersSagas() {
  yield all([
    //call generator functions
    call(onFetchOrdersStart),
  ]);
}
