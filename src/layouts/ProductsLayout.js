import React from "react";
import { Link } from "react-router-dom";

import Header from "./../components/Header";
import Footer from "./../components/Footer";

const MenuLayout = (props) => {
  return (
    <div className="menuLayout">
      <Header {...props} />
      <ul>
        <li>
          <Link to="/regular"> Regular Bakes </Link>
        </li>
        <li>
          <Link to="/special"> Weekly Specials </Link>
        </li>
        <li>
          <Link to="custom">Custom Cakes </Link>
        </li>
      </ul>
      <div className="content">{props.children}</div>
      <Footer />
    </div>
  );
};

export default MenuLayout;
