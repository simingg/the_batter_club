import React, { useState, useEffect } from "react";
import "./styles.scss";
import Table from "@material-ui/core/Table";
import { withStyles } from "@material-ui/core/styles";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableContainer from "@material-ui/core/TableContainer";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

const styles = (theme) => ({
  table: {
    minWidth: 300,
    minHeight: 300,
  },
  col1: {
    width: "10%",
    fontSize: 16,
  },
  col2: {
    width: "10%",
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
    width: "10%",
    fontSize: 16,
  },
  col6: {
    width: "5%",
    fontSize: 16,
  },
  col7: {
    width: "5%",
    fontSize: 16,
  },
  col8: {
    width: "20%",
    fontSize: 16,
  },
});

const OrderList = (props) => {
  const [todayDate, setTodayDate] = useState(new Date().toLocaleDateString());
  const { classes, orderArr, contentLoading } = props;
  const [array, setArray] = useState([]);

  useEffect(() => {
    setArray(orderArr);
  }, [contentLoading, orderArr]);

  return (
    <div className="container">
      <h2>
        {" "}
        Order List <small> Today's Date: {todayDate} </small>
      </h2>

      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell className={classes.col1}> DateDeliver</TableCell>
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
                Size{" "}
              </TableCell>
              <TableCell className={classes.col6} align="right">
                {" "}
                Quan{" "}
              </TableCell>
              <TableCell className={classes.col7} align="right">
                {" "}
                Total{" "}
              </TableCell>
              <TableCell className={classes.col8} align="right">
                {" "}
                Address{" "}
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {array.map((item) => (
              <TableRow key={"trial"}>
                <TableCell className={classes.col1} align="right">
                  {item.deliverDate}
                </TableCell>
                <TableCell className={classes.col2} align="right">
                  {item.name}
                </TableCell>
                <TableCell className={classes.col3} align="right">
                  {item.phoneNumber}
                </TableCell>
                <TableCell className={classes.col4} align="right">
                  {item.itemName}
                </TableCell>
                <TableCell className={classes.col5} align="right">
                  {item.itemSize}
                </TableCell>
                <TableCell className={classes.col6} align="right" alt="null">
                  {item.itemQ}
                </TableCell>
                <TableCell className={classes.col7} align="right">
                  {item.itemTotal}
                </TableCell>
                <TableCell className={classes.col8} align="right">
                  {item.deliverAdd[0] +
                    " " +
                    item.deliverAdd[1] +
                    " S'pore " +
                    item.deliverAdd[2]}
                </TableCell>
              </TableRow>
              // <TableRow key={row.name}>
              //   <TableCell component="th" scope="row">
              //     {row.name}
              //   </TableCell>
              //   <TableCell align="right">{row.calories}</TableCell>
              //   <TableCell align="right">{row.fat}</TableCell>
              //   <TableCell align="right">{row.carbs}</TableCell>
              //   <TableCell align="right">{row.protein}</TableCell>
              // </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {/* <Table className={classes.table} aria-label="customized table">
        <TableContainer component={Paper}>
          <TableHead className="table-header">
            <TableRow className="table-row">
              <TableCell className={classes.col1}> DateDeliver</TableCell>
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
                Size{" "}
              </TableCell>
              <TableCell className={classes.col6} align="right">
                {" "}
                Quan{" "}
              </TableCell>
              <TableCell className={classes.col7} align="right">
                {" "}
                Total{" "}
              </TableCell>
              <TableCell className={classes.col8} align="right">
                {" "}
                Address{" "}
              </TableCell>
            </TableRow>
          </TableHead>
        </TableContainer>
        <TableBody>
          <TableRow key={"trial"}>
            <TableCell className={classes.col1} align="right">
              trial
            </TableCell>
            <TableCell className={classes.col2} align="right">
              trial
            </TableCell>
            <TableCell className={classes.col3} align="right">
              trial
            </TableCell>
            <TableCell className={classes.col4} align="right">
              trial
            </TableCell>
            <TableCell className={classes.col5} align="right">
              trial
            </TableCell>
            <TableCell className={classes.col6} align="right" alt="null">
              trial
            </TableCell>
            <TableCell className={classes.col7} align="right">
              trial
            </TableCell>
            <TableCell className={classes.col8} align="right">
              trial
            </TableCell>
          </TableRow>
        </TableBody>
      </Table> */}
    </div>
  );
};

export default withStyles(styles)(OrderList);
