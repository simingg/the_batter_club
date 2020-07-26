import React, { Component } from "react";
import { connect } from "react-redux";
import "./styles.scss";
import { fetchOrders } from "../../redux/Orders/orders.actions";
import Table from "@material-ui/core/Table";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableContainer from "@material-ui/core/TableContainer";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

const styles = (theme) => ({
  table: {
    width: "100%",
  },
  col1: {
    width: "10%",
    fontSize: 16,
  },
  col2: {
    width: "20%",
    fontSize: 16,
  },
  col3: {
    width: "20%",
    fontSize: 16,
  },
  col4: {
    width: "20%",
    fontSize: 16,
  },
  col5: {
    width: "30%",
    fontSize: 16,
  },
});

class OrderList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date().toLocaleDateString(),
    };
    this.props.fetchesOrders();
  }
  render() {
    const { orders, classes } = this.props;
    let item = orders.map((x) => {
      const { name, phoneNumber, deliveringAddress, orderedItems } = x;
      if (orderedItems.length === 0) {
        return null;
      } else {
        const dateToDeliver = orderedItems.slice(-1);
        orderedItems.pop();
        return (
          <div>
            <TableCell className={classes.col1} align="right">
              {dateToDeliver}
            </TableCell>
            <TableCell className={classes.col2} align="right">
              {name}
            </TableCell>
            <TableCell className={classes.col3} align="right">
              {phoneNumber}
            </TableCell>
            <TableCell className={classes.col4} align="right">
              {orderedItems.map((item, index) => {
                if (index % 2 === 0) {
                  return item;
                }
              })}
              ({" "}
              {orderedItems.map((item, index) => {
                if (index % 2 !== 0) {
                  return item;
                }
              })}{" "}
              )
            </TableCell>
            <TableCell className={classes.col5} align="right">
              {deliveringAddress.slice(0, 1)}
              <br />
              Unit: {deliveringAddress.slice(1, 2)}
              <br />
              PostalCode: {deliveringAddress.slice(2)}
            </TableCell>
          </div>
        );
      }
    });

    return (
      <div className="container">
        <h2>
          {" "}
          Order List <small> Today's Date: {this.state.date} </small>
        </h2>
        <Table className={classes.table} aria-label="customized table">
          <TableContainer component={Paper}>
            <TableHead className="table-header">
              <TableRow className="table-row">
                <TableCell className={classes.col1}> Date To Deliver</TableCell>
                <TableCell className={classes.col2} align="right">
                  {" "}
                  Customer Name
                </TableCell>
                <TableCell className={classes.col3} align="right">
                  {" "}
                  Phone Number
                </TableCell>
                <TableCell className={classes.col4} align="right">
                  {" "}
                  Order{" "}
                </TableCell>
                <TableCell className={classes.col5} align="right">
                  {" "}
                  Address{" "}
                </TableCell>
              </TableRow>
            </TableHead>
          </TableContainer>
          <TableBody>{item}</TableBody>
        </Table>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { orderList } = state;
  return {
    orders: orderList.orders,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchesOrders: () => dispatch(fetchOrders()),
  };
};

export default withStyles(styles)(
  connect(mapStateToProps, mapDispatchToProps)(OrderList)
);
