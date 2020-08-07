import OurCause from "../../components/OurCause";
import React from "react";
import about from "../../assets/about.jpg";

import "./styles.scss";
const About = (props) => {
  return (
    <div className="container">
      <div className="heading-container">
        <div className="heading-content">
          <h2 className="about-header"> About The Batter Club</h2>
          <p className="p">
            {" "}
            Established by us two passionate individuals, The Better Half is the
            birth of our dreams. We are The Better Half simply because we see
            how bakes and coffee complement each other, thereby being each
            others’ better half. We also happen to be each others’ better half!
            After 1.5 years of running our bakery online since March 2018, we
            have now achieved our dream of establishing a bakery coffeeshop
            where we can serve you artisan bakes and specialty coffee offline,
            allowing you to step into our humble space feeling like home. Every
            bake and beverage we make is carefully made from scratch with our
            bare hands, putting authenticity and love into every knead and every
            fold – so as to provide honest and real fare for you
          </p>
        </div>
      </div>

      <div className="img-container">
        <div className="img-content">
          <img src={about} alt="" />
        </div>
      </div>

      <div className="the-team">
        <div className="first">
          <h4> First Thing</h4>
          Baking is where my passion lies in, apart from my better half. I
          insist on 100% honest and pure ingredients in our bakes, with no food
          colourings, preservatives, or improvers.{" "}
        </div>
        <div className="second">
          {" "}
          <h4> Second Thing</h4>A barista and artist, passionate in coffee
          making and still life oil painting. Also the creative
          mind/planner/designer/photographer/bake assistant behind this
          business. A perfectionist and a living ball of energy!
        </div>
      </div>
    </div>
  );
};

export default About;
