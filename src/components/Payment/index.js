import React from "react";
import { useDispatch, connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { clearCart } from "../../redux/Cart/cart.actions";
import { Grid } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  listItem: {
    padding: theme.spacing(1, 0),
  },
  listItemText: {
    fontSize: "14px",
  },
  total: {
    fontWeight: 700,
  },
  title: {
    marginTop: theme.spacing(2),
  },
}));

const PaymentPage = (props) => {
  const { cart, total } = props;
  const classes = useStyles();
  const dispatch = useDispatch();

  const clearingCart = () => {
    dispatch(clearCart());
  };

  return (
    <React-Fragment>
      <Typography variant="h3">Order Summary</Typography>
      <List disablePadding>
        {cart.quantityByName.map((product) => (
          <ListItem className={classes.listItem} key={product.name}>
            <ListItemText primary={product.name} />
            <Typography variant="body1">{product.total} </Typography>
          </ListItem>
        ))}
        <ListItem className={classes.listItem}>
          <ListItemText className={classes.listItemText} primary="Total" />
          <Typography variant="h5" className={classes.total}>
            {total}
          </Typography>
        </ListItem>
      </List>

      <Grid container spacing={2}>
        <Grid item xs={6} sm={6}>
          <Typography variant="h4" gutterBottom className={classes.title}>
            Payment
          </Typography>
          <Typography gutterBottom> PayLah/PayNow to ... </Typography>
        </Grid>
      </Grid>
    </React-Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    cart: state.cart,
    user: state.user.currentUser,
    total: state.cart.quantityByName.reduce(
      (accTotal, item) => accTotal + item.total,
      0
    ),
  };
};

const mapDispatchToProps = {
  clearCart,
};

export default connect(mapStateToProps, mapDispatchToProps)(PaymentPage);
