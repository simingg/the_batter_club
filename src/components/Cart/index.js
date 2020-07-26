import React, { Component } from "react";
import { connect } from "react-redux";
import "./styles.scss";
import { withRouter } from "react-router-dom";
import Snackbar from "@material-ui/core/Snackbar";
import {
  addQtyItem,
  minusQtyItem,
  delQtyItem,
} from "../../redux/Cart/cart.actions";
import { Alert } from "../forms/alert";
import minusCircle from "../../assets/minusCircle.svg";
import addCircle from "../../assets/addCircle.svg";
import delCircle from "../../assets/delCircle.svg";

class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cartTotal: 0,
      open: false,
    };
  }

  handleOpen = () => this.setState({ open: true });

  handleClose = () => this.setState({ open: false });

  handleBack() {
    return this.props.history.push("/regular");
  }

  handleCheckout() {
    const { cart } = this.props;
    if (cart.quantityByName.length === 0) {
      this.handleOpen();
    } else {
      return this.props.history.push("/details");
    }
  }

  render() {
    const { cart } = this.props;
    let product = cart.quantityByName.map((item) => {
      const { name, price, quantity, total } = item;
      return (
        <div className="item">
          <div className="buttons">
            <span
              className="delete-btn"
              onClick={() => {
                this.props.handleDelQtyItem({ name });
              }}
            >
              <img src={delCircle} alt="" />
            </span>
          </div>
          <div className="description">
            <span> {name} </span>
          </div>
          <div className="quantity">
            <button
              className="plus-btn"
              type="button"
              name="button"
              onClick={() => {
                this.props.handleAddQtyItem({ name });
              }}
            >
              <img src={addCircle} alt="" />
            </button>
            <input type="text" name="name" value={quantity} />
            <button
              className="minus-btn"
              type="button"
              name="button"
              onClick={() => {
                this.props.handleMinusQtyItem({ name });
              }}
            >
              <img src={minusCircle} alt="" />
            </button>
            <div className="total"> ${total} </div>
          </div>
        </div>
      );
    });

    return (
      <div className="shopping-cart">
        <div className="heading"> Cart </div>
        {product}
        <div className="total-price">Total: ${this.props.total}</div>
        <button className="continue" onClick={() => this.handleBack()}>
          {" "}
          Continue Shopping
        </button>
        <button
          className="continue"
          onClick={() => {
            this.handleCheckout();
          }}
        >
          {" "}
          Checkout{" "}
        </button>
        <Snackbar
          open={this.state.open}
          autoHideDuration={3000}
          onClose={this.handleClose}
        >
          <Alert onClose={this.handleClose} severity="warning">
            No Items in Cart. Please Add Item :>
          </Alert>
        </Snackbar>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    cart: state.cart,
    total: state.cart.quantityByName.reduce(
      (accTotal, item) => parseInt(accTotal, 10) + parseInt(item.total, 10),
      0
    ),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleAddQtyItem: (name) => dispatch(minusQtyItem(name)),
    handleMinusQtyItem: (name) => dispatch(addQtyItem(name)),
    handleDelQtyItem: (name) => dispatch(delQtyItem(name)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Cart));
