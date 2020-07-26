import React, { useEffect } from "react";
import Directory from "../../components/Directory";
import "./styles.scss";
import bananaCake from "../../assets/bananaCake.jpg";
import Footer from "../../components/Footer";
import Lightbox from "react-simple-lightbox";

/* global $ */
const Homepage = (props) => {
  return (
    <>
      <section className="homepage">
        <Directory />
      </section>
      <section className="section-c">
        <div className="gallery">
          <Lightbox>
            <img src={bananaCake} alt="cake" />
          </Lightbox>
          <Lightbox>
            <img src={bananaCake} alt="cake" />
          </Lightbox>
          <Lightbox>
            <img src={bananaCake} alt="cake" />
          </Lightbox>
          <Lightbox>
            <img src={bananaCake} alt="cake" />
          </Lightbox>

          <Lightbox>
            <img src={bananaCake} alt="cake" />
          </Lightbox>

          <Lightbox>
            <img src={bananaCake} alt="cake" />
          </Lightbox>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Homepage;
