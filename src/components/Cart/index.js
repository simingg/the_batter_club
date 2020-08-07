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
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import RemoveCircleIcon from "@material-ui/icons/RemoveCircle";

class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cartTotal: 0,
      open: false,
      signUpAlert: false,
    };
  }

  handleOpen = () => this.setState({ open: true });

  handleOpenAlert = () => this.setState({ signUpAlert: true });

  handleClose = () => this.setState({ open: false });

  handleCloseAlert = () => this.setState({ signUpAlert: false });

  handleBack() {
    return this.props.history.push("/regular");
  }

  handleCheckout() {
    const { cart, user } = this.props;
    if (user === null) {
      this.handleOpenAlert();
    }
    if (cart.quantityByName.length === 0) {
      this.handleOpen();
    } else {
      return this.props.history.push("/details");
    }
  }

  render() {
    const { cart } = this.props;
    let product = cart.quantityByName.map((item) => {
      const { name, quantity, size, total } = item;
      return (
        <ListItem alignItems="flex-start" key={name}>
          <ListItemAvatar>
            <IconButton
              onClick={() => {
                this.props.handleDelQtyItem({ name });
              }}
            >
              <DeleteIcon />
            </IconButton>
          </ListItemAvatar>
          <ListItemText primary={name} secondary={size} />
          <ListItemSecondaryAction>
            <div className="quantity">
              <IconButton
                edge="end"
                aria-label="minus"
                onClick={() => {
                  this.props.handleMinusQtyItem({ name });
                }}
              >
                <RemoveCircleIcon />
              </IconButton>
              <input
                styles={{ fontSize: "18px" }}
                type="text"
                name="name"
                value={quantity}
              />
              <IconButton
                edge="end"
                aria-label="add"
                onClick={() => {
                  this.props.handleAddQtyItem({ name });
                }}
              >
                <AddCircleIcon />
              </IconButton>
            </div>
            <div className="sub-total"> ${total} </div>
          </ListItemSecondaryAction>
        </ListItem>
      );
    });

    return (
      <div className="shopping-cart">
        <div className="heading"> Cart </div>
        <List>{product}</List>
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
        <Snackbar
          open={this.state.signUpAlert}
          autoHideDuration={3000}
          onClose={this.handleCloseAlert}
        >
          <Alert onClose={this.handleCloseAlert} severity="error">
            Please Log In or Sign Up before checking out!
          </Alert>
        </Snackbar>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    cart: state.cart,
    user: state.user.currentUser,
    total: state.cart.quantityByName.reduce(
      (accTotal, item) => parseInt(accTotal, 10) + parseInt(item.total, 10),
      0
    ),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleMinusQtyItem: (name) => dispatch(minusQtyItem(name)),
    handleAddQtyItem: (name) => dispatch(addQtyItem(name)),
    handleDelQtyItem: (name) => dispatch(delQtyItem(name)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Cart));
