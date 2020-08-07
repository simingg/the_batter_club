import React, { useState } from "react";
import { addToCart } from "../../redux/Cart/cart.actions";
import { useDispatch, connect } from "react-redux";
import Button from "../../components/forms/Button";
import { Alert } from "../forms/alert";
import Snackbar from "@material-ui/core/Snackbar";
import Modal from "../Modal";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormLabel from "@material-ui/core/FormLabel";
import "./styles.scss";

//props is ur product
const Product = (props) => {
  const { product, index } = props;
  const dispatch = useDispatch();
  const [err, setErr] = useState(false);
  const [OOS, setOOS] = useState(false);
  const [notLogin, setLogin] = useState(false);
  const [prodName, setProdName] = useState(product.productName);
  const [size, setSize] = useState("");
  const [hideModal, setHideModal] = useState(true);
  const [sizeError, setSizeError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const p = product.productPriceArray.filter((item) => item.size === size);
    if (size) {
      dispatch(
        addToCart({
          name: prodName,
          size: size,
          price: p[0].price,
        })
      );
      setHideModal(!hideModal); //true
    } else {
      setSizeError(true);
    }
  };

  const handleSizeError = () => {
    setSizeError(false);
  };
  const handleCloseErr = () => {
    setErr(false);
  };

  const handleOOSClose = () => {
    setOOS(false);
  };

  const handleCloseSignIn = () => {
    setLogin(false);
  };

  const {
    productName,
    productThumbnail,
    productThumbnail2,
    productThumbnail3,
    productPriceArray,
    productDescription,
    oos,
  } = product;

  const toggleModal = () => setHideModal(!hideModal);

  const checkModal = (oos) => {
    const { cart, user } = props;
    let item = cart.quantityByName.filter((item) => item.name === productName);
    if (item.length !== 0) {
      setHideModal(true);
      setErr(true);
    }
    if (oos) {
      setHideModal(true);
      setOOS(true);
    }
    if (user === null) {
      setHideModal(true);
      setLogin(true);
    } else if (item.length === 0 && user) {
      setHideModal(!hideModal);
    }
  };

  const configModal = {
    hideModal,
    toggleModal,
  };

  return (
    <div className="container-product">
      <div className="product" key={index}>
        <div className="img-container">
          <img
            style={{
              width: "50%",
              height: "50%",
              float: "left",
            }}
            src={productThumbnail}
            alt="img"
          />
          <img
            style={{
              height: "20%",
              width: "25%",
              float: "right",
            }}
            src={productThumbnail2}
            alt="img"
          />
          <img
            style={{
              height: "25%",
              width: "25%",
              float: "right",
              marginTop: "150px",
            }}
            src={productThumbnail3}
            alt="img"
          />
        </div>
        <div className="product-info">
          <div className="product-content">
            <h1> {productName} </h1>
            <p> {productDescription} </p>
            <div className="buttons">
              <Button onClick={() => checkModal(oos)}>Add To Cart</Button>
            </div>
          </div>
        </div>
      </div>
      <Modal toggleModal={toggleModal} hideModal={hideModal}>
        <div className="product-card">
          <form onSubmit={handleSubmit}>
            <h4> {productName}</h4>
            <FormLabel component="legend"> Size </FormLabel>
            <RadioGroup
              aria-label="Size"
              value={size}
              onChange={(e) => setSize(e.target.value)}
            >
              {productPriceArray.map((item) => {
                const { price, size } = item;
                return (
                  <FormControlLabel
                    value={size}
                    control={<Radio />}
                    label={size}
                  />
                );
              })}
            </RadioGroup>
            <Button className="button" type="submit">
              Add to Cart!
            </Button>
          </form>
        </div>
      </Modal>
      <Snackbar open={err} autoHideDuration={3000} onClose={handleCloseErr}>
        <Alert onClose={handleCloseErr} severity="warning">
          Item Already In Cart!
        </Alert>
      </Snackbar>
      <Snackbar open={OOS} autoHideDuration={3000} onClose={handleOOSClose}>
        <Alert onClose={handleOOSClose} severity="error">
          Item OOS!
        </Alert>
      </Snackbar>
      <Snackbar
        open={notLogin}
        autoHideDuration={3000}
        onClose={handleCloseSignIn}
      >
        <Alert onClose={handleCloseSignIn} severity="error">
          Please Log In or Sign Up.
        </Alert>
      </Snackbar>
      <Snackbar
        open={sizeError}
        autoHideDuration={3000}
        onClose={handleSizeError}
      >
        <Alert onClose={handleSizeError} severity="error">
          Please Select a Size.
        </Alert>
      </Snackbar>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    cart: state.cart,
    products: state.productsData.products,
    user: state.user.currentUser,
  };
};

const mapDispatchToProps = {
  addToCart,
};

export default connect(mapStateToProps, mapDispatchToProps)(Product);
