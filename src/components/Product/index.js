import React, { useState } from "react";
import { addToCart } from "../../redux/Cart/cart.actions";
import { useDispatch, connect } from "react-redux";
import Button from "../../components/forms/Button";
import { Alert } from "../forms/alert";
import Snackbar from "@material-ui/core/Snackbar";
import "./styles.scss";

//props is ur product
const Product = (props) => {
  const { product, index } = props;
  const dispatch = useDispatch();
  const [err, setErr] = useState(false);
  const [bar, setBar] = useState(false);

  const handleCloseErr = () => {
    setErr(false);
  };

  const handleClose = () => {
    setBar(false);
  };

  const addItem = (productName, productPrice) => {
    const { cart } = props;
    let item = cart.quantityByName.filter(
      (item) => item.name === productName.productName
    );
    if (item.length !== 0) {
      setErr(true);
    } else {
      dispatch(
        addToCart({
          productName,
        })
      );
      setBar(true);
    }
  };

  const {
    productName,
    productThumbnail,
    productPrice,
    productDescription,
  } = product;

  return (
    <div className="container">
      <div className="product" key={index}>
        <div className="img-container">
          <img src={productThumbnail} />
        </div>
        <div className="product-info">
          <div className="product-content">
            <h1> {productName} </h1>
            <p> {productDescription} </p>
            <div class="buttons">
              <Button onClick={() => addItem({ productName, productPrice })}>
                Add To Cart
              </Button>
              <span class="button" id="price">
                {" "}
                ${productPrice}
              </span>
            </div>
          </div>
        </div>
      </div>
      <Snackbar open={bar} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
          Item Added In Cart!
        </Alert>
      </Snackbar>
      <Snackbar open={err} autoHideDuration={3000} onClose={handleCloseErr}>
        <Alert onClose={handleCloseErr} severity="warning">
          Item Already In Cart!
        </Alert>
      </Snackbar>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    cart: state.cart,
  };
};

const mapDispatchToProps = {
  addToCart,
};

export default connect(mapStateToProps, mapDispatchToProps)(Product);
