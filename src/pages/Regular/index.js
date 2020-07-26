import React, { useEffect } from "react";
import { useDispatch, useSelector, connect } from "react-redux";
import { fetchProductsStart } from "../../redux/Products/products.actions";
import Product from "../../components/Product";

const mapState = ({ productsData }) => ({
  products: productsData.products,
});

const Regular = (props) => {
  const { products } = useSelector(mapState);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProductsStart());
  }, []);

  return products.map((product, index) => {
    const { productCategory } = product;
    if (productCategory === "regular") {
      return <Product product={product} index={index} />;
    }
  });
};

const mapStateToCart = (state) => {
  return {
    cart: state.cart,
  };
};

export default connect(mapStateToCart)(Regular);
