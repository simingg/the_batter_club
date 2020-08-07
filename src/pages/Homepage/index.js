import React, { useEffect, useState } from "react";
import Directory from "../../components/Directory";
import "./styles.scss";
import bananaCake from "../../assets/bananaCake.jpg";
import banana from "../../assets/banana.jpg";
import brownies from "../../assets/brownies.jpg";
import chubcookie from "../../assets/chubcookie.jpg";
import doughnut from "../../assets/doughnut.jpg";
import carrotCake from "../../assets/carrotCake.jpg";
import Footer from "../../components/Footer";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100%",
    overflow: "hidden !important",
  },
  tile: {
    height: "100%",
    display: "block",
  },

  gridList: {
    width: "100%",
    height: "100%",
  },

  image: {
    maxHeight: 350,
    margin: 40,
    width: "100%",
    cursor: "pointer",
  },
}));

const Homepage = (props) => {
  const [isOpen, setOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);
  const classes = useStyles();

  const images = [
    bananaCake,
    banana,
    brownies,
    chubcookie,
    doughnut,
    carrotCake,
  ];

  const imageClick = () => {
    setOpen(true);
  };

  const setOnClose = () => {
    setOpen(false);
  };

  const setPhotoIndexing = () => {
    setPhotoIndex((photoIndex + images.length - 1) % images.length);
  };

  const setNextPhotoIndex = () => {
    setPhotoIndex((photoIndex + 1) % images.length);
  };

  return (
    <>
      <section className="homepage">
        <Directory />
      </section>
      <section className="section-c">
        <div className={classes.root}>
          <GridList cellHeight={300} className={classes.gridList} cols={3}>
            {images.map((image) => (
              <GridListTile key={image}>
                <img
                  className={classes.image}
                  src={image}
                  alt="cake"
                  onClick={() => imageClick()}
                />
              </GridListTile>
            ))}
          </GridList>
        </div>
        <div>
          {isOpen && (
            <Lightbox
              mainSrc={images[photoIndex]}
              nextSrc={images[(photoIndex + 1) % images.length]}
              prevSrc={images[(photoIndex + images.length - 1) % images.length]}
              onCloseRequest={() => setOnClose()}
              onMovePrevRequest={() => setPhotoIndexing()}
              onMoveNextRequest={() => setNextPhotoIndex()}
            />
          )}
        </div>
      </section>
      <Footer />
    </>
  );
};

export default withStyles(useStyles)(Homepage);
