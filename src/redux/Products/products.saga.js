import { auth } from "./../../firebase/utils";
import { takeLatest, put, all, call } from "redux-saga/effects";
import { setProducts, fetchProductsStart } from "./products.actions";
import {
  handleAddProduct,
  handleFetchProducts,
  handleDeleteProduct,
  handleOosProduct,
  handleInStockProduct,
} from "./products.helpers";
import productsTypes from "./products.types";

export function* addProduct({
  //destructure payload
  payload: {
    productCategory,
    productName,
    productThumbnail,
    productThumbnail2,
    productThumbnail3,
    productPriceArray,
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
      productThumbnail2,
      productThumbnail3,
      productPriceArray,
      productDescription,
      productAdminUserUID: auth.currentUser.uid,
      createdDate: timestamp,
      oos: false,
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

export function* oosProduct({ payload }) {
  try {
    yield handleOosProduct(payload);
  } catch (err) {
    console.log(err);
  }
}

export function* onOosProductStart() {
  yield takeLatest(productsTypes.SET_OOS_PRODUCT, oosProduct);
}

export function* inStockProduct({ payload }) {
  try {
    yield handleInStockProduct(payload);
  } catch (err) {
    console.log(err);
  }
}

export function* onInStockProductStart() {
  yield takeLatest(productsTypes.SET_IN_STOCK, inStockProduct);
}

export default function* productsSagas() {
  yield all([
    //call generator functions
    call(onAddProductStart),
    call(onFetchProductsStart),
    call(onDeleteProductStart),
    call(onOosProductStart),
    call(onInStockProductStart),
  ]);
}
