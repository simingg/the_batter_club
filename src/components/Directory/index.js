import React from "react";
import image1 from "./../../assets/1.jpg";
import image2 from "./../../assets/2.jpg";
import "./styles.scss";
import { Link } from "react-router-dom";

//link to products menu
//link to about page
const Directory = (props) => {
  return (
    <div className="directory">
      <div className="wrap">
        <div className="item" style={{ backgroundImage: `url(${image1})` }}>
          <a href="/regular">Our Bakes</a>
        </div>
        <div className="about">
          <article>
            <p>
              <h4> About Us </h4> Her mom had warned her. She had been warned
              time and again, but she had refused to believe her. She had done
              everything right and she knew she would be rewarded for doing so
              with the promotion. So when the promotion was given to her main
              rival, it not only stung, <Link to="/about"> Read More...</Link>
            </p>
          </article>
          <article>
            <p>
              <h4> Our Bakes </h4> Her mom had warned her. She had been warned
              time and again, but she had refused to believe her. She had done
              everything right and she knew she would be rewarded for doing so
              with the promotion. So when the promotion was given to her main
              rival, it not only stung, <Link to="/regular"> Read More...</Link>
            </p>
          </article>
        </div>
      </div>
    </div>
  );
};

export default Directory;
