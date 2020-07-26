import React from "react";
import { useSelector, useDispatch, connect } from "react-redux";
import "./styles.scss";
import { signOutUserStart } from "./../../redux/User/user.actions";
import Logo from "./../../assets/logo.png";
import { Link } from "react-router-dom";
import moment from "moment";

const mapState = ({ user, cart }) => ({
  currentUser: user.currentUser,
  cart: cart.quantityByName,
});

const Header = (props) => {
  const dispatch = useDispatch();
  const { currentUser, cart } = useSelector(mapState);
  const date = moment().day(5).format("MM-DD");

  const signOut = () => {
    dispatch(signOutUserStart());
  };

  return (
    <header className="header">
      <div className="wrap">
        <div className="logo">
          <Link to="/">
            <img src={Logo} alt="logo" />
          </Link>
        </div>

        <div className="callToActions">
          {currentUser && (
            <ul>
              <li>
                <Link to="/faq"> FAQ </Link>
              </li>
              <li>
                <Link to="/regular"> Our Bakes</Link>
              </li>
              <li>
                <Link to="/dashboard"> Cart {cart.length} </Link>
              </li>
              <li>
                <span onClick={() => signOut()}>Logout</span>
              </li>
            </ul>
          )}
          {!currentUser && (
            <ul>
              <li>
                <Link to="/registration">Join Us</Link>
              </li>
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/faq"> FAQ </Link>
              </li>
              <li>
                <Link to="/regular"> Our Bakes</Link>
              </li>
            </ul>
          )}
        </div>
        <div className="dateClose">Order Closes on {date}</div>
      </div>
    </header>
  );
};

Header.defaultProps = {
  currentUser: null,
  cart: [],
};

export default Header;
