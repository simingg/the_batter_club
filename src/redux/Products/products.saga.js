import { auth } from "./../../firebase/utils";
import { takeLatest, put, all, call } from "redux-saga/effects";
import { setProducts, fetchProductsStart } from "./products.actions";
import {
  handleAddProduct,
  handleFetchProducts,
  handleDeleteProduct,
} from "./products.helpers";

import productsTypes from "./products.types";

export function* addProduct({
  //destructure payload
  payload: {
    productCategory,
    productName,
    productThumbnail,
    productPrice,
    productDescription,
  },
}) {
  try {
    const timestamp = new Date();
    //creating fields to doc in firebase
    yield handleAddProduct({
      productCategory,
      productName,
      productThumbnail,
      productPrice,
      productDescription,
      productAdminUserUID: auth.currentUser.uid,
      createdDate: timestamp,
    });
    yield put(fetchProductsStart());
  } catch (err) {
    console.log(err);
  }
}

export function* onAddProductStart() {
  yield takeLatest(productsTypes.ADD_NEW_PRODUCT_START, addProduct);
}

export function* fetchProducts() {
  try {
    const products = yield handleFetchProducts();
    yield put(setProducts(products));
  } catch (err) {
    // console.log(err);
  }
}

export function* onFetchProductsStart() {
  yield takeLatest(productsTypes.FETCH_PRODUCTS_START, fetchProducts);
}

export function* deleteProduct({ payload }) {
  try {
    yield handleDeleteProduct(payload);
    yield put(fetchProductsStart());
  } catch (err) {
    // console.log(err);
  }
}

export function* onDeleteProductStart() {
  yield takeLatest(productsTypes.DELETE_PRODUCT_START, deleteProduct);
}

export default function* productsSagas() {
  yield all([
    //call generator functions
    call(onAddProductStart),
    call(onFetchProductsStart),
    call(onDeleteProductStart),
  ]);
}
