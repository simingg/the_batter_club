import React from "react";

import "./styles.scss";

const VerticalNavi = ({ children }) => {
  return (
    <div className="verticalNav">
      <div className="menu">{children}</div>
    </div>
  );
};

export default VerticalNavi;
